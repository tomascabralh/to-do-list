import { useContext } from "react";
import { TasksContext } from "./TasksContext";

export function useTasksContext() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasks debe usarse dentro de <TasksProvider>");
  return ctx;
}
