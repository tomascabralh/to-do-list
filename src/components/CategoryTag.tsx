import { Chip } from "@mui/material";
import { useCategories } from "../hooks/useCategories";
import { CategoryTagProps } from "../types";

export default function CategoryTag({ categoryId, done }: CategoryTagProps) {
  const { categories } = useCategories();
  const category = categories.find((c) => c.id === categoryId);
  if (!category) return null;
  return (
    <Chip
      label={category.name}
      size="small"
      sx={{
        borderRadius: 2,
        fontWeight: 500,
        bgcolor: done ? "#f5f5f5" : "rgba(76,175,80,0.08)",
        color: done ? "#757575" : "rgb(46,125,50)",
        border: done ? "1px solid #e0e0e0" : "1px solid #C8E6C9",
        fontSize: 13,
        transition: "all 0.2s",
      }}
    />
  );
}
