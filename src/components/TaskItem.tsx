import { Checkbox, Box, Typography, Paper, Avatar } from "@mui/material";
import { Task } from "../types";
import CategoryTag from "./CategoryTag";

const ICONS: Record<string, string> = {
  manzana: "🍎",
  agua: "💧",
  viaje: "✈️",
  paseo: "🐾",
  compras: "🛒",
  pizza: "🍕",
  corazon: "❤️",
  gota: "🩸",
  camara: "📷",
  gato: "🐱",
};

interface TaskItemProps {
  task: Task;
  onToggle: (task: Task) => void;
  onEdit?: (task: Task) => void;
}

export default function TaskItem({ task, onToggle, onEdit }: TaskItemProps) {
  const icon = task.icon ? ICONS[task.icon] || task.icon : "🍎";
  const color = task.color || "#E57373";
  const isDone = !!task.completed;

  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        p: 1.5,
        mb: 1.5,
        boxShadow: 0,
        borderRadius: 3,
        bgcolor: isDone ? "#f5f5f8" : "#fff",
        opacity: isDone ? 1 : 1,
        cursor: onEdit ? "pointer" : "default",
        transition: "background 0.2s",
        "&:hover": onEdit ? { bgcolor: "#f0f4f8" } : {},
      }}
      onClick={
        onEdit
          ? (e) => {
              // Evitar que el click en el checkbox dispare la edición
              if ((e.target as HTMLElement).closest(".MuiCheckbox-root"))
                return;
              onEdit(task);
            }
          : undefined
      }
    >
      <Checkbox
        checked={isDone}
        onChange={() => onToggle(task)}
        inputProps={{ "aria-label": "Marcar tarea como terminada o pendiente" }}
        sx={{ mr: 1.5 }}
      />
      <Avatar
        sx={{
          bgcolor: isDone ? "#bdbdbd" : color,
          color: isDone ? "#616161" : "#222",
          width: 32,
          height: 32,
          fontSize: 22,
          mr: 2,
          transition: "background 0.2s",
        }}
      >
        {icon}
      </Avatar>
      <Box sx={{ flex: 1 }}>
        <Typography
          fontWeight={600}
          fontSize={16}
          color={isDone ? "#616161" : "text.primary"}
        >
          {task.title}
        </Typography>
        {task.description && (
          <Typography
            variant="body2"
            color={isDone ? "#9e9e9e" : "text.secondary"}
          >
            {task.description}
          </Typography>
        )}
      </Box>
      <CategoryTag categoryId={task.category_id} done={isDone} />
    </Paper>
  );
}
