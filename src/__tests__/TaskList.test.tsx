import { render, screen } from "@testing-library/react";
import { TasksProvider } from "../context/tasksContext";
import TaskList from "../components/TaskList";

const mockTasks = [
  {
    id: "1",
    title: "Comprar pan",
    description: "Ir a la panadería",
    category_id: "cat1",
    completed: false,
    icon: "manzana",
    color: "#E57373",
  },
  {
    id: "2",
    title: "Leer libro",
    description: "Terminar capítulo 3",
    category_id: "cat2",
    completed: true,
    icon: "gato",
    color: "#81C784",
  },
];

jest.mock("../context/useTasksContext", () => ({
  useTasksContext: () => ({
    tasks: mockTasks,
    loading: false,
    error: null,
    toggleTaskStatus: jest.fn(),
  }),
}));

test("renders TaskList with pending and completed tasks", () => {
  render(
    <TasksProvider>
      <TaskList />
    </TasksProvider>
  );

  expect(screen.getByText("Lista de tareas")).toBeDefined();
  expect(screen.getByText("Comprar pan")).toBeDefined();
  expect(screen.getByText("Leer libro")).toBeDefined();
  expect(screen.getByText("Pendientes")).toBeDefined();
  expect(screen.getByText("Terminadas")).toBeDefined();
});
