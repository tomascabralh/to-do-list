import axios from "axios";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  getCategories,
} from "../../services/api";
import { Task, Category } from "../../types";

// Mock axios
jest.mock("axios");
const mockAxios = axios as jest.Mocked<typeof axios>;

describe("API Service", () => {
  beforeEach(() => {
    mockAxios.get.mockClear();
    mockAxios.post.mockClear();
    mockAxios.put.mockClear();
  });

  describe("getTasks", () => {
    test("fetches and transforms tasks correctly", async () => {
      const mockApiResponse = [
        {
          id: 1,
          title: "Task 1",
          description: "Description 1",
          category_id: "cat1",
          completed: false,
          icon: "manzana",
          color: "#E57373",
        },
        {
          id: 2,
          title: "Task 2",
          description: null,
          category_id: "cat2",
          completed: true,
          icon: null,
          color: null,
        },
      ];

      const expectedTasks: Task[] = [
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
          description: "",
          category_id: "cat2",
          completed: true,
          icon: null,
          color: null,
        },
      ];

      mockAxios.get.mockResolvedValue({ data: mockApiResponse });

      const result = await getTasks();

      expect(mockAxios.get).toHaveBeenCalledWith("http://localhost:3000/tasks");
      expect(result).toEqual(expectedTasks);
    });

    test("handles API errors", async () => {
      mockAxios.get.mockRejectedValue(new Error("Network error"));

      await expect(getTasks()).rejects.toThrow("Network error");
    });
  });

  describe("getTask", () => {
    test("fetches and transforms single task correctly", async () => {
      const mockApiResponse = {
        id: 1,
        title: "Task 1",
        description: "Description 1",
        category_id: "cat1",
        completed: false,
        icon: "manzana",
        color: "#E57373",
      };

      const expectedTask: Task = {
        id: "1",
        title: "Task 1",
        description: "Description 1",
        category_id: "cat1",
        completed: false,
        icon: "manzana",
        color: "#E57373",
      };

      mockAxios.get.mockResolvedValue({ data: mockApiResponse });

      const result = await getTask("1");

      expect(mockAxios.get).toHaveBeenCalledWith(
        "http://localhost:3000/tasks/1"
      );
      expect(result).toEqual(expectedTask);
    });
  });

  describe("createTask", () => {
    test("creates task with correct data transformation", async () => {
      const newTask: Omit<Task, "id"> = {
        title: "New Task",
        description: "New Description",
        category_id: "cat1",
        completed: false,
        icon: "manzana",
        color: "#E57373",
      };

      const mockApiResponse = {
        id: 1,
        ...newTask,
      };

      const expectedTask: Task = {
        id: "1",
        ...newTask,
      };

      mockAxios.post.mockResolvedValue({ data: mockApiResponse });

      const result = await createTask(newTask);

      expect(mockAxios.post).toHaveBeenCalledWith(
        "http://localhost:3000/tasks",
        {
          title: "New Task",
          description: "New Description",
          category_id: "cat1",
          completed: false,
          icon: "manzana",
          color: "#E57373",
        }
      );
      expect(result).toEqual(expectedTask);
    });

    test("handles null values correctly", async () => {
      const newTask: Omit<Task, "id"> = {
        title: "New Task",
        description: "",
        category_id: "cat1",
        completed: false,
        icon: null,
        color: null,
      };

      const mockApiResponse = {
        id: 1,
        ...newTask,
      };

      mockAxios.post.mockResolvedValue({ data: mockApiResponse });

      await createTask(newTask);

      expect(mockAxios.post).toHaveBeenCalledWith(
        "http://localhost:3000/tasks",
        {
          title: "New Task",
          description: "",
          category_id: "cat1",
          completed: false,
          icon: null,
          color: null,
        }
      );
    });
  });

  describe("updateTask", () => {
    test("updates task with correct data transformation", async () => {
      const taskUpdate: Partial<Task> = {
        title: "Updated Task",
        completed: true,
      };

      const mockApiResponse = {
        id: 1,
        title: "Updated Task",
        description: "Original Description",
        category_id: "cat1",
        completed: true,
        icon: "manzana",
        color: "#E57373",
      };

      const expectedTask: Task = {
        id: "1",
        title: "Updated Task",
        description: "Original Description",
        category_id: "cat1",
        completed: true,
        icon: "manzana",
        color: "#E57373",
      };

      mockAxios.put.mockResolvedValue({ data: mockApiResponse });

      const result = await updateTask("1", taskUpdate);

      expect(mockAxios.put).toHaveBeenCalledWith(
        "http://localhost:3000/tasks/1",
        {
          title: "Updated Task",
          completed: true,
          icon: null,
          color: null,
        }
      );
      expect(result).toEqual(expectedTask);
    });
  });

  describe("getCategories", () => {
    test("fetches categories correctly", async () => {
      const mockApiResponse: Category[] = [
        { id: "cat1", name: "Compras" },
        { id: "cat2", name: "Trabajo" },
      ];

      mockAxios.get.mockResolvedValue({ data: mockApiResponse });

      const result = await getCategories();

      expect(mockAxios.get).toHaveBeenCalledWith(
        "http://localhost:3000/categories"
      );
      expect(result).toEqual(mockApiResponse);
    });
  });
});
