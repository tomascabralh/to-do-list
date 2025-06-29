import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useState } from "react";
import { Container, Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { useTasksContext } from "./context/useTasksContext";
import { createTask, updateTask } from "./services/api";
import { Task } from "./types";
import { TasksProvider } from "./context/TasksProvider";

function AppContent() {
  const [open, setOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const { setTasks } = useTasksContext();

  const handleCreate = async (task: Omit<Task, "id">) => {
    const newTask = await createTask(task);
    setTasks((prev: Task[]) => [newTask, ...prev]);
    setOpen(false);
  };

  const handleEdit = async (task: Task) => {
    const updated = await updateTask(task.id, task);
    setTasks((prev: Task[]) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
    setTaskToEdit(null);
    setOpen(false);
  };

  const handleOpenEdit = (task: Task) => {
    setTaskToEdit(task);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTaskToEdit(null);
  };

  return (
    <Box sx={{ minHeight: "100vh", py: 0 }}>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          minHeight: "100vh",
          py: 8,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: 700,
            bgcolor: "#F9FAFF",
            borderRadius: 4,
            boxShadow: "0 4px 32px 0 rgba(0,0,0,0.07)",
            px: { xs: 1, sm: 4 },
            py: { xs: 2, sm: 6 },
            minHeight: 600,
          }}
        >
          <TaskList onEdit={handleOpenEdit} />
          <TaskForm
            open={open}
            onClose={handleClose}
            onCreate={handleCreate}
            onEdit={handleEdit}
            taskToEdit={taskToEdit}
          />
          <Fab
            color="success"
            aria-label="Agregar tarea"
            sx={{
              mt: 3,
              alignSelf: "flex-end",
              boxShadow: "0 4px 16px 0 rgba(76,175,80,0.25)",
            }}
            onClick={() => {
              setOpen(true);
              setTaskToEdit(null);
            }}
          >
            <AddIcon />
          </Fab>
        </Box>
      </Container>
    </Box>
  );
}

export default function App() {
  return (
    <TasksProvider>
      <AppContent />
    </TasksProvider>
  );
}
