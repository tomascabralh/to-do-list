import { useEffect, useState } from "react";
import { Task } from "../types";
import { getTasks, updateTask } from "../services/api";

export function useTasksState() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getTasks()
      .then(setTasks)
      .catch(() => setError("Error al cargar tareas"))
      .finally(() => setLoading(false));
  }, []);

  const toggleTaskStatus = async (task: Task) => {
    const updated: Task = { ...task, completed: !task.completed };
    setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
    try {
      await updateTask(task.id, { ...task, completed: !task.completed });
    } catch {
      setError("Error al actualizar tarea");
      setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
    }
  };

  return { tasks, setTasks, loading, error, toggleTaskStatus };
}
