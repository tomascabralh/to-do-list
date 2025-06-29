import { Checkbox, Box, Typography, Paper } from "@mui/material";
import {
  Apple,
  WaterDrop,
  Flight,
  Pets,
  ShoppingCart,
  LocalPizza,
  Favorite,
  Bloodtype,
  CameraAlt,
  Pets as Cat,
} from "@mui/icons-material";
import { TaskItemProps } from "../types";
import CategoryTag from "./CategoryTag";

const ICONS: Record<string, React.ComponentType> = {
  manzana: Apple,
  agua: WaterDrop,
  viaje: Flight,
  paseo: Pets,
  compras: ShoppingCart,
  pizza: LocalPizza,
  corazon: Favorite,
  gota: Bloodtype,
  camara: CameraAlt,
  gato: Cat,
};

export default function TaskItem({ task, onToggle, onEdit }: TaskItemProps) {
  const IconComponent = task.icon ? ICONS[task.icon] || Apple : Apple;
  const color = task.color || "#FF5E5E";
  const isDone = !!task.completed;

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "center" },
        gap: { xs: 1, sm: 0 },
        p: 2,
        mb: 2,
        boxShadow: isDone
          ? "0 2px 8px 0 rgba(0,0,0,0.04)"
          : "0 4px 16px 0 rgba(0,0,0,0.08)",
        borderRadius: 3,
        bgcolor: isDone ? "#f8f9fa" : "#F9FAFF",
        border: isDone ? "1px solid #e9ecef" : "1px solid #f1f3f4",
        cursor: onEdit ? "pointer" : "default",
        transition: "all 0.2s ease-in-out",
        "&:hover": onEdit
          ? {
              boxShadow: "0 6px 20px 0 rgba(0,0,0,0.12)",
              transform: "translateY(-1px)",
              bgcolor: "#fafbfc",
            }
          : {},
      }}
      onClick={
        onEdit
          ? (e) => {
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
        sx={{
          mr: 2,
          "& .MuiSvgIcon-root": {
            fontSize: 20,
          },
          "&.Mui-checked": {
            color: isDone ? "#6c757d" : color,
          },
        }}
      />
      <IconComponent
        sx={{
          fontSize: 28,
          color: isDone ? "#6c757d" : color,
          mr: 2.5,
          verticalAlign: "middle",
        }}
      />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          fontWeight={600}
          fontSize={16}
          color={isDone ? "#6c757d" : "#2c3e50"}
          sx={{
            mb: task.description ? 0.5 : 0,
          }}
        >
          {task.title}
        </Typography>
        {task.description && (
          <Typography
            variant="body2"
            color={isDone ? "#adb5bd" : "#6c757d"}
            sx={{
              lineHeight: 1.4,
            }}
          >
            {task.description}
          </Typography>
        )}
      </Box>
      <CategoryTag categoryId={task.category_id} done={isDone} />
    </Paper>
  );
}
