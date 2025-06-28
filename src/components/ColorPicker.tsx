import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

const COLORS = [
  "#E57373",
  "#FBC02D",
  "#81C784",
  "#388E3C",
  "#64B5F6",
  "#BA68C8",
  "#FF8A65",
  "#A1887F",
  "#90CAF9",
  "#FFD54F",
];

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <Box mb={2}>
      <Typography variant="subtitle2" mb={1} fontWeight={500}>
        Color
      </Typography>
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={(_, newColor) => newColor && onChange(newColor)}
        sx={{ flexWrap: "wrap", gap: 1 }}
      >
        {COLORS.map((color) => (
          <ToggleButton
            key={color}
            value={color}
            sx={{ p: 0.5, border: "none", bgcolor: "transparent" }}
          >
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                bgcolor: color,
                border:
                  value === color ? "2px solid #388E3C" : "2px solid #fff",
                boxShadow: value === color ? "0 0 0 2px #A5D6A7" : undefined,
              }}
            />
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}
