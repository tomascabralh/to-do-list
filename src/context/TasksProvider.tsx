import { ReactNode } from "react";
import { TasksContext } from "./TasksContext";
import { useTasksState } from "../hooks/useTasksState";

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const value = useTasksState();
  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};
