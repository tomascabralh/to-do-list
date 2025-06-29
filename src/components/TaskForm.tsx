import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  Box,
  Stack,
  useTheme,
  Typography,
} from "@mui/material";
import { useCategories } from "../hooks/useCategories";
import IconPicker from "./IconPicker";
import ColorPicker from "./ColorPicker";
import { Apple } from "@mui/icons-material";
import { handleSubmit } from "../utils/handleSubmit";
import { handleClose } from "../utils/handleClose";
import { TaskFormProps, Category } from "../types";
import { UI_CONSTANTS, DEFAULTS } from "../constants";

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
  const [icon, setIcon] = useState<string | null>(DEFAULTS.ICON);
  const [color, setColor] = useState<string | null>(DEFAULTS.COLOR);
  const [tab, setTab] = useState<0 | 1 | undefined>(undefined);
  const [error, setError] = useState("");
  const theme = useTheme();

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || "");
      setDescription(taskToEdit.description || "");
      setCategoryId(taskToEdit.category_id || "");
      setIcon(taskToEdit.icon || DEFAULTS.ICON);
      setColor(taskToEdit.color || DEFAULTS.COLOR);
    } else {
      setTitle("");
      setDescription("");
      setCategoryId("");
      setIcon(DEFAULTS.ICON);
      setColor(DEFAULTS.COLOR);
    }
    setTab(undefined);
    setError("");
  }, [taskToEdit, open]);

  return (
    <Dialog
      open={open}
      onClose={() => handleClose(setError, onClose)}
      fullWidth
      maxWidth={false}
      PaperProps={{
        sx: {
          maxWidth: 396,
          width: { xs: "100vw", sm: 396 },
          borderRadius: 6,
          bgcolor: "#fff",
          p: 0,
          boxShadow: "0 4px 32px 0 rgba(0,0,0,0.10)",
        },
      }}
    >
      <DialogContent
        sx={{
          px: { xs: 2, sm: 4 },
          pt: { xs: 1.5, sm: 2 },
          pb: 0,
          bgcolor: "#fff",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-start"
          alignItems="center"
          sx={{ mb: 2, mt: 1 }}
        >
          <Box
            onClick={() => setTab(0)}
            sx={{
              display: "flex",
              alignItems: "center",
              px: 1.5,
              py: 1,
              borderRadius: 99,
              cursor: "pointer",
              bgcolor: tab === 0 ? "#fafafd" : "#fafafd",
              border:
                tab === 0 ? `2px solid ${color}` : "2px solid transparent",
              fontWeight: 600,
              fontSize: 20,
              fontFamily: "inherit",
              color: tab === 0 ? color : theme.palette.text.primary,
              transition: "all 0.2s",
              boxShadow: tab === 0 ? "0 2px 8px 0 rgba(0,0,0,0.04)" : "none",
            }}
          >
            <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
              <Apple sx={{ fontSize: 18 }} />
            </Box>
            <Typography fontWeight={500} color="black">
              Icono
            </Typography>
          </Box>
          <Box
            onClick={() => setTab(1)}
            sx={{
              display: "flex",
              alignItems: "center",
              px: 1.5,
              py: 1,
              borderRadius: 99,
              cursor: "pointer",
              bgcolor: "#fafafd",
              border:
                tab === 1 ? `2px solid ${color}` : "2px solid transparent",
              fontWeight: 600,
              fontSize: 20,
              fontFamily: "inherit",
              color: tab === 1 ? color : theme.palette.text.primary,
              transition: "all 0.2s",
              boxShadow: tab === 1 ? "0 2px 8px 0 rgba(0,0,0,0.04)" : "none",
            }}
          >
            <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  bgcolor: color,
                }}
              />
            </Box>
            <Typography fontWeight={500} color="black">
              Color
            </Typography>
          </Box>
        </Stack>
        {tab === 0 && (
          <Box sx={{ mb: 2, mt: 0 }}>
            <IconPicker
              value={icon || ""}
              onChange={setIcon}
              selectedColor={color || "#FF5E5E"}
            />
          </Box>
        )}
        {tab === 1 && (
          <Box sx={{ mb: 2, mt: 0 }}>
            <ColorPicker value={color || ""} onChange={setColor} />
          </Box>
        )}
        <TextField
          label="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          inputProps={{ maxLength: UI_CONSTANTS.TITLE_MAX_LENGTH }}
          margin="normal"
          variant="standard"
          sx={{ mb: 1.5, fontSize: 12, mt: 0 }}
        />
        <TextField
          label="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          inputProps={{ maxLength: UI_CONSTANTS.DESCRIPTION_MAX_LENGTH }}
          margin="normal"
          variant="standard"
          sx={{ mb: 1.5, fontSize: 12 }}
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
            margin="normal"
            variant="standard"
            sx={{ mb: 1.5, fontSize: 12 }}
          >
            {categories.map((cat: Category) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>
        )}
        {error && (
          <Typography
            color="error"
            sx={{ mt: 1, fontSize: 14, fontWeight: 500 }}
          >
            {error}
          </Typography>
        )}
      </DialogContent>
      <DialogActions
        sx={{
          px: { xs: 2, sm: 4 },
          pb: { xs: 2, sm: "40px" },
          pt: { xs: 1.5, sm: "48px" },
          bgcolor: "#fff",
          justifyContent: "flex-end",
        }}
      >
        <Button
          onClick={() => handleClose(setError, onClose)}
          sx={{
            color: "#388E3C",
            fontWeight: 500,
            fontSize: 14,
            mr: "16px",
            p: 0,
          }}
        >
          CANCELAR
        </Button>
        <Button
          onClick={() =>
            handleSubmit({
              title,
              description,
              categoryId,
              icon,
              color,
              taskToEdit,
              onEdit,
              onCreate,
              setError,
            })
          }
          variant="contained"
          sx={{
            bgcolor: "#388E3C",
            fontWeight: 500,
            fontSize: 14,
            borderRadius: 99,

            boxShadow: "none",
            "&:hover": { bgcolor: "#2e7031" },
          }}
        >
          {taskToEdit ? "GUARDAR" : "CREAR"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
