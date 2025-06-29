import { Task } from "../types";

export function splitTasks(tasks: Task[]) {
  return {
    pendientes: tasks.filter((t: Task) => !t.completed),
    terminadas: tasks.filter((t: Task) => t.completed),
  };
}
