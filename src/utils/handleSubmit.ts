import { Task } from "../types";

export function handleSubmit({
  title,
  description,
  categoryId,
  icon,
  color,
  taskToEdit,
  onEdit,
  onCreate,
  setError,
}: {
  title: string;
  description: string;
  categoryId: string;
  icon: string | null;
  color: string | null;
  taskToEdit?: Task | null;
  onEdit?: (task: Task) => void;
  onCreate: (task: Omit<Task, "id">) => void;
  setError: (msg: string) => void;
}) {
  if (!title.trim()) {
    setError("El título es obligatorio");
    return;
  }
  if (title.length > 40) {
    setError("Máximo 40 caracteres para el título");
    return;
  }
  if (description.length > 100) {
    setError("Máximo 100 caracteres para la descripción");
    return;
  }
  if (!categoryId) {
    setError("Selecciona una categoría");
    return;
  }
  setError("");
  if (taskToEdit && onEdit) {
    onEdit({
      ...taskToEdit,
      title: title.trim(),
      description: description.trim(),
      category_id: categoryId,
      icon,
      color,
    });
  } else {
    onCreate({
      title: title.trim(),
      description: description.trim(),
      category_id: categoryId,
      completed: false,
      icon,
      color,
    });
  }
}
