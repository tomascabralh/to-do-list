import { render, screen, fireEvent } from "@testing-library/react";
import TaskForm from "../components/TaskForm";

const mockCategories = [
  { id: "cat1", name: "Personal" },
  { id: "cat2", name: "Trabajo" },
];

jest.mock("../hooks/useCategories", () => ({
  useCategories: () => ({
    categories: mockCategories,
    loading: false,
    error: null,
  }),
}));

test("renders TaskForm and allows creating a task", () => {
  const onCreate = jest.fn();
  render(<TaskForm open={true} onClose={jest.fn()} onCreate={onCreate} />);
  fireEvent.change(screen.getByLabelText(/Título/i), {
    target: { value: "Nueva tarea" },
  });
  fireEvent.change(screen.getByLabelText(/Descripción/i), {
    target: { value: "Descripción" },
  });
  fireEvent.mouseDown(screen.getByLabelText(/Categoría/i));
  fireEvent.click(screen.getByText("Personal"));
  fireEvent.click(screen.getByText(/Crear/i));
  expect(onCreate).toHaveBeenCalled();
});

test("renders TaskForm in edit mode and allows editing", () => {
  const onEdit = jest.fn();
  const taskToEdit = {
    id: "1",
    title: "Editar tarea",
    description: "Desc",
    category_id: "cat2",
    completed: false,
    icon: "manzana",
    color: "#E57373",
  };
  render(
    <TaskForm
      open={true}
      onClose={jest.fn()}
      onCreate={jest.fn()}
      onEdit={onEdit}
      taskToEdit={taskToEdit}
    />
  );
  fireEvent.change(screen.getByLabelText(/Título/i), {
    target: { value: "Tarea editada" },
  });
  fireEvent.click(screen.getByText(/Guardar/i));
  expect(onEdit).toHaveBeenCalledWith(
    expect.objectContaining({ title: "Tarea editada" })
  );
});
