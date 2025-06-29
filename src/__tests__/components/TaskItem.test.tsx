import { render, screen, fireEvent } from "@testing-library/react";
import TaskItem from "../../components/TaskItem";

const mockTask = {
  id: "1",
  title: "Comprar pan",
  description: "Ir a la panadería",
  category_id: "cat1",
  completed: false,
  icon: "manzana",
  color: "#FF5E5E",
};

test("renders TaskItem with title and description", () => {
  render(<TaskItem task={mockTask} onToggle={jest.fn()} />);
  expect(screen.getByText("Comprar pan")).toBeDefined();
  expect(screen.getByText("Ir a la panadería")).toBeDefined();
});

test("calls onToggle when checkbox is clicked", () => {
  const onToggle = jest.fn();
  render(<TaskItem task={mockTask} onToggle={onToggle} />);
  const checkbox = screen.getByRole("checkbox");
  fireEvent.click(checkbox);
  expect(onToggle).toHaveBeenCalledWith(mockTask);
});

test("calls onEdit when item is clicked", () => {
  const onEdit = jest.fn();
  render(<TaskItem task={mockTask} onToggle={jest.fn()} onEdit={onEdit} />);
  const item = screen.getByText("Comprar pan");
  fireEvent.click(item);
  expect(onEdit).toHaveBeenCalledWith(mockTask);
});
