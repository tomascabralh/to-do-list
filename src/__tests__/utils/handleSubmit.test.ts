import { handleSubmit } from "../../utils/handleSubmit";
import { Task } from "../../types";

describe("handleSubmit", () => {
  const mockSetError = jest.fn();
  const mockOnCreate = jest.fn();
  const mockOnEdit = jest.fn();

  const mockTaskToEdit: Task = {
    id: "1",
    title: "Original Task",
    description: "Original Description",
    category_id: "cat1",
    completed: false,
    icon: "manzana",
    color: "#E57373",
  };

  beforeEach(() => {
    mockSetError.mockClear();
    mockOnCreate.mockClear();
    mockOnEdit.mockClear();
  });

  test("calls onCreate when creating new task with valid data", () => {
    const validData = {
      title: "New Task",
      description: "New Description",
      categoryId: "cat1",
      icon: "agua" as string | null,
      color: "#81C784" as string | null,
      taskToEdit: undefined,
      onEdit: undefined,
      onCreate: mockOnCreate,
      setError: mockSetError,
    };

    handleSubmit(validData);

    expect(mockSetError).toHaveBeenCalledWith("");
    expect(mockOnCreate).toHaveBeenCalledWith({
      title: "New Task",
      description: "New Description",
      category_id: "cat1",
      completed: false,
      icon: "agua",
      color: "#81C784",
    });
  });

  test("calls onEdit when editing existing task", () => {
    const editData = {
      title: "Updated Task",
      description: "Updated Description",
      categoryId: "cat2",
      icon: "viaje" as string | null,
      color: "#64B5F6" as string | null,
      taskToEdit: mockTaskToEdit,
      onEdit: mockOnEdit,
      onCreate: mockOnCreate,
      setError: mockSetError,
    };

    handleSubmit(editData);

    expect(mockSetError).toHaveBeenCalledWith("");
    expect(mockOnEdit).toHaveBeenCalledWith({
      ...mockTaskToEdit,
      title: "Updated Task",
      description: "Updated Description",
      category_id: "cat2",
      icon: "viaje",
      color: "#64B5F6",
    });
  });

  test("sets error when title is empty", () => {
    const invalidData = {
      title: "",
      description: "Description",
      categoryId: "cat1",
      icon: "manzana" as string | null,
      color: "#E57373" as string | null,
      taskToEdit: undefined,
      onEdit: undefined,
      onCreate: mockOnCreate,
      setError: mockSetError,
    };

    handleSubmit(invalidData);

    expect(mockSetError).toHaveBeenCalledWith("El título es obligatorio");
    expect(mockOnCreate).not.toHaveBeenCalled();
  });

  test("sets error when title is too long", () => {
    const invalidData = {
      title: "A".repeat(41),
      description: "Description",
      categoryId: "cat1",
      icon: "manzana" as string | null,
      color: "#E57373" as string | null,
      taskToEdit: undefined,
      onEdit: undefined,
      onCreate: mockOnCreate,
      setError: mockSetError,
    };

    handleSubmit(invalidData);

    expect(mockSetError).toHaveBeenCalledWith(
      "Máximo 40 caracteres para el título"
    );
    expect(mockOnCreate).not.toHaveBeenCalled();
  });

  test("sets error when description is too long", () => {
    const invalidData = {
      title: "Valid Title",
      description: "A".repeat(101),
      categoryId: "cat1",
      icon: "manzana" as string | null,
      color: "#E57373" as string | null,
      taskToEdit: undefined,
      onEdit: undefined,
      onCreate: mockOnCreate,
      setError: mockSetError,
    };

    handleSubmit(invalidData);

    expect(mockSetError).toHaveBeenCalledWith(
      "Máximo 100 caracteres para la descripción"
    );
    expect(mockOnCreate).not.toHaveBeenCalled();
  });

  test("sets error when category is not selected", () => {
    const invalidData = {
      title: "Valid Title",
      description: "Valid Description",
      categoryId: "",
      icon: "manzana" as string | null,
      color: "#E57373" as string | null,
      taskToEdit: undefined,
      onEdit: undefined,
      onCreate: mockOnCreate,
      setError: mockSetError,
    };

    handleSubmit(invalidData);

    expect(mockSetError).toHaveBeenCalledWith("Selecciona una categoría");
    expect(mockOnCreate).not.toHaveBeenCalled();
  });

  test("trims title and description", () => {
    const dataWithWhitespace = {
      title: "  Task with spaces  ",
      description: "  Description with spaces  ",
      categoryId: "cat1",
      icon: "manzana" as string | null,
      color: "#E57373" as string | null,
      taskToEdit: undefined,
      onEdit: undefined,
      onCreate: mockOnCreate,
      setError: mockSetError,
    };

    handleSubmit(dataWithWhitespace);

    expect(mockOnCreate).toHaveBeenCalledWith({
      title: "Task with spaces",
      description: "Description with spaces",
      category_id: "cat1",
      completed: false,
      icon: "manzana",
      color: "#E57373",
    });
  });
});
