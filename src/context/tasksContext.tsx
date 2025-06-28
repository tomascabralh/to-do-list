import { createContext, ReactNode } from "react";
import { useTasksState } from "../hooks/useTasksState";

export const TasksContext = createContext<
  ReturnType<typeof useTasksState> | undefined
>(undefined);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const value = useTasksState();
  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};
