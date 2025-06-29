export interface Category {
  id: string;
  name: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  category_id: string;
  completed: boolean;
  icon: string | null;
  color: string | null;
}

export interface CategoryTagProps {
  categoryId: string;
  done?: boolean;
}

export interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  onCreate: (task: Omit<Task, "id">) => void;
  onEdit?: (task: Task) => void;
  taskToEdit?: Task | null;
}

export interface IconPickerProps {
  value: string;
  onChange: (icon: string) => void;
  selectedColor?: string;
}

export interface TaskListProps {
  onEdit?: (task: Task) => void;
}

export interface TaskItemProps {
  task: Task;
  onToggle: (task: Task) => void;
  onEdit?: (task: Task) => void;
}
