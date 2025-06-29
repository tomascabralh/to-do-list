import { createContext } from "react";
import { useTasksState } from "../hooks/useTasksState";

export const TasksContext = createContext<
  ReturnType<typeof useTasksState> | undefined
>(undefined);
