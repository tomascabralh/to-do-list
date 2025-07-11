import { useContext } from "react";
import { TasksContext, TasksContextType } from "./TasksContext.tsx";

export function useTasksContext(): TasksContextType {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasks debe usarse dentro de <TasksProvider>");
  return ctx;
}
