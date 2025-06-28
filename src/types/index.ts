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
