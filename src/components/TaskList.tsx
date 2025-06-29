import { Box, Typography, Paper, CircularProgress } from "@mui/material";
import { useTasksContext } from "../context/useTasksContext";
import TaskItem from "./TaskItem.tsx";
import { Task } from "../types";
import { splitTasks } from "../utils/splitTasks";
import { TaskListProps } from "../types";

export default function TaskList({ onEdit }: TaskListProps) {
  const { tasks, loading, error, toggleTaskStatus } = useTasksContext();
  const { pendientes, terminadas } = splitTasks(tasks);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={4} sx={{ color: "#222" }}>
        Lista de tareas
      </Typography>
      <Paper
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 4,
          bgcolor: "#fff",
          boxShadow: "none",
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight={600}
          mb={2}
          sx={{ color: "#222" }}
        >
          Pendientes
        </Typography>
        {pendientes.length === 0 ? (
          <Typography color="text.secondary">
            No hay tareas pendientes
          </Typography>
        ) : (
          pendientes.map((task: Task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTaskStatus}
              onEdit={onEdit}
            />
          ))
        )}
      </Paper>
      <Paper sx={{ p: 3, borderRadius: 4, bgcolor: "#fff", boxShadow: "none" }}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          mb={2}
          sx={{ color: "#222" }}
        >
          Terminadas
        </Typography>
        {terminadas.length === 0 ? (
          <Typography color="text.secondary">
            No hay tareas terminadas
          </Typography>
        ) : (
          terminadas.map((task: Task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTaskStatus}
              onEdit={onEdit}
            />
          ))
        )}
      </Paper>
    </Box>
  );
}
