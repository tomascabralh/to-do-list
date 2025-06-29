import { Box, ToggleButton } from "@mui/material";
import { ColorPickerProps } from "../types";
import { COLORS } from "../constants";

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
