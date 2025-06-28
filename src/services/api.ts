import axios from "axios";
import { Task, Category } from "../types";

const API_URL = "http://localhost:3000";

// Utilidades de mapeo
function apiToUi(task: Record<string, unknown>): Task {
  return {
    id: String(task.id),
    title: String(task.title),
    description: typeof task.description === "string" ? task.description : "",
    category_id: String(task.category_id),
    completed: Boolean(task.completed),
    icon: typeof task.icon === "string" ? task.icon : null,
    color: typeof task.color === "string" ? task.color : null,
  };
}

function uiToApi(task: Partial<Task>): Record<string, unknown> {
  return {
    ...task,
    completed: task.completed ?? false,
    icon: task.icon ?? null,
    color: task.color ?? null,
  };
}

export const getTasks = async (): Promise<Task[]> => {
  const { data } = await axios.get(`${API_URL}/tasks`);
  return data.map(apiToUi);
};

export const getTask = async (id: string): Promise<Task> => {
  const { data } = await axios.get(`${API_URL}/tasks/${id}`);
  return apiToUi(data);
};

export const createTask = async (task: Omit<Task, "id">): Promise<Task> => {
  const { data } = await axios.post(`${API_URL}/tasks`, uiToApi(task));
  return apiToUi(data);
};

export const updateTask = async (
  id: string,
  task: Partial<Task>
): Promise<Task> => {
  const { data } = await axios.put(`${API_URL}/tasks/${id}`, uiToApi(task));
  return apiToUi(data);
};

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await axios.get(`${API_URL}/categories`);
  return data;
};
