import { Box, ToggleButton } from "@mui/material";
import { ColorPickerProps } from "../types";

const COLORS = [
  "#FF5E5E",
  "#12AE71",
  "#2E7D32",
  "#C0A0F3",
  "#FAC3D6",
  "#FFE100",
  "#FA82DC",
  "#FF9C63",
  "#82D15C",
  "#78F7E9",
];

export default function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <Box mb={2}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "repeat(4, 1fr)", sm: "repeat(5, 1fr)" },
          rowGap: "14px",
          columnGap: "59px",
          justifyItems: "center",
        }}
      >
        {COLORS.map((color) => (
          <ToggleButton
            key={color}
            value={color}
            selected={value === color}
            onClick={() => onChange(color)}
            sx={{
              p: 0,
              border: "none",
              bgcolor: "transparent !important",
              boxShadow: "none",
              "&:hover": { bgcolor: "transparent !important" },
              "&.Mui-selected": {
                bgcolor: "transparent !important",
              },
              "&.Mui-selected:hover": {
                bgcolor: "transparent !important",
              },
            }}
          >
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                bgcolor: color,
                border: value === color ? "2px solid #888" : "2px solid #bbb",
                boxSizing: "border-box",
                transition: "border 0.2s",
              }}
            />
          </ToggleButton>
        ))}
      </Box>
    </Box>
  );
}
