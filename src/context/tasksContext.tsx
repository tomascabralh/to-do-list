import { createContext } from "react";
import { useTasksState } from "../hooks/useTasksState";

export type TasksContextType = ReturnType<typeof useTasksState>;

export const TasksContext = createContext<TasksContextType | undefined>(
  undefined
);
