import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import { useCategories } from "../hooks/useCategories";
import { Category, Task } from "../types";
import IconPicker from "./IconPicker";
import ColorPicker from "./ColorPicker";

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  onCreate: (task: Omit<Task, "id">) => void;
  onEdit?: (task: Task) => void;
  taskToEdit?: Task | null;
}

export default function TaskForm({
  open,
  onClose,
  onCreate,
  onEdit,
  taskToEdit,
}: TaskFormProps) {
  const { categories, loading } = useCategories();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [icon, setIcon] = useState<string | null>("manzana");
  const [color, setColor] = useState<string | null>("#E57373");
  const [tab, setTab] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || "");
      setDescription(taskToEdit.description || "");
      setCategoryId(taskToEdit.category_id || "");
      setIcon(taskToEdit.icon || "manzana");
      setColor(taskToEdit.color || "#E57373");
    } else {
      setTitle("");
      setDescription("");
      setCategoryId("");
      setIcon("manzana");
      setColor("#E57373");
    }
    setTab(0);
    setError("");
  }, [taskToEdit, open]);

  const handleSubmit = () => {
    if (!title.trim()) {
      setError("El título es obligatorio");
      return;
    }
    if (title.length > 40) {
      setError("Máximo 40 caracteres para el título");
      return;
    }
    if (description.length > 100) {
      setError("Máximo 100 caracteres para la descripción");
      return;
    }
    if (!categoryId) {
      setError("Selecciona una categoría");
      return;
    }
    setError("");
    if (taskToEdit && onEdit) {
      onEdit({
        ...taskToEdit,
        title: title.trim(),
        description: description.trim(),
        category_id: categoryId,
        icon,
        color,
      });
    } else {
      onCreate({
        title: title.trim(),
        description: description.trim(),
        category_id: categoryId,
        completed: false,
        icon,
        color,
      });
    }
  };

  const handleClose = () => {
    setError("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{taskToEdit ? "Editar tarea" : "Nueva tarea"}</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} centered>
            <Tab label="Icono" />
            <Tab label="Color" />
          </Tabs>
          {tab === 0 && <IconPicker value={icon || ""} onChange={setIcon} />}
          {tab === 1 && <ColorPicker value={color || ""} onChange={setColor} />}
        </Box>
        <TextField
          label="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
          inputProps={{ maxLength: 40 }}
          margin="normal"
        />
        <TextField
          label="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          inputProps={{ maxLength: 100 }}
          margin="normal"
        />
        {loading ? (
          <CircularProgress size={24} />
        ) : (
          <TextField
            select
            label="Categoría"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            fullWidth
            required
            margin="normal"
          >
            {categories.map((cat: Category) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>
        )}
        {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" color="success">
          {taskToEdit ? "Guardar" : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
