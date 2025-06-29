import { renderHook, act, waitFor } from "@testing-library/react";
import { useTasksState } from "../../hooks/useTasksState";
import { getTasks, updateTask } from "../../services/api";
import { Task } from "../../types";

// Mock API functions
jest.mock("../../services/api", () => ({
  getTasks: jest.fn(),
  updateTask: jest.fn(),
}));

const mockGetTasks = getTasks as jest.MockedFunction<typeof getTasks>;
const mockUpdateTask = updateTask as jest.MockedFunction<typeof updateTask>;

describe("useTasksState", () => {
  const mockTasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "Description 1",
      category_id: "cat1",
      completed: false,
      icon: "manzana",
      color: "#E57373",
    },
    {
      id: "2",
      title: "Task 2",
      description: "Description 2",
      category_id: "cat2",
      completed: true,
      icon: "agua",
      color: "#81C784",
    },
  ];

  beforeEach(() => {
    mockGetTasks.mockClear();
    mockUpdateTask.mockClear();
  });

  test("initializes with loading state", () => {
    mockGetTasks.mockResolvedValue(mockTasks);

    const { result } = renderHook(() => useTasksState());

    expect(result.current.loading).toBe(true);
    expect(result.current.tasks).toEqual([]);
    expect(result.current.error).toBe(null);
  });

  test("loads tasks successfully", async () => {
    mockGetTasks.mockResolvedValue(mockTasks);

    const { result } = renderHook(() => useTasksState());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.tasks).toEqual(mockTasks);
    expect(result.current.error).toBe(null);
  });

  test("handles loading error", async () => {
    mockGetTasks.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useTasksState());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("Error al cargar tareas");
    expect(result.current.tasks).toEqual([]);
  });

  test("toggles task status successfully", async () => {
    mockGetTasks.mockResolvedValue(mockTasks);
    mockUpdateTask.mockResolvedValue({ ...mockTasks[0], completed: true });

    const { result } = renderHook(() => useTasksState());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.toggleTaskStatus(mockTasks[0]);
    });

    expect(mockUpdateTask).toHaveBeenCalledWith("1", {
      ...mockTasks[0],
      completed: true,
    });
  });

  test("handles toggle error and reverts state", async () => {
    mockGetTasks.mockResolvedValue(mockTasks);
    mockUpdateTask.mockRejectedValue(new Error("Update failed"));

    const { result } = renderHook(() => useTasksState());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.toggleTaskStatus(mockTasks[0]);
    });

    expect(result.current.error).toBe("Error al actualizar tarea");
    expect(result.current.tasks).toEqual(mockTasks);
  });

  test("updates local state optimistically", async () => {
    mockGetTasks.mockResolvedValue(mockTasks);
    mockUpdateTask.mockResolvedValue({ ...mockTasks[0], completed: true });

    const { result } = renderHook(() => useTasksState());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.toggleTaskStatus(mockTasks[0]);
    });

    const updatedTask = result.current.tasks.find((t) => t.id === "1");
    expect(updatedTask?.completed).toBe(true);
  });
});
