import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

const ICONS = [
  { key: "manzana", icon: "🍎" },
  { key: "agua", icon: "💧" },
  { key: "viaje", icon: "✈️" },
  { key: "paseo", icon: "🐾" },
  { key: "compras", icon: "🛒" },
  { key: "pizza", icon: "🍕" },
  { key: "corazon", icon: "❤️" },
  { key: "gota", icon: "🩸" },
  { key: "camara", icon: "📷" },
  { key: "gato", icon: "🐱" },
];

interface IconPickerProps {
  value: string;
  onChange: (icon: string) => void;
}

export default function IconPicker({ value, onChange }: IconPickerProps) {
  return (
    <Box mb={2}>
      <Typography variant="subtitle2" mb={1} fontWeight={500}>
        Icono
      </Typography>
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={(_, newIcon) => newIcon && onChange(newIcon)}
        sx={{ flexWrap: "wrap", gap: 1 }}
      >
        {ICONS.map(({ key, icon }) => (
          <ToggleButton
            key={key}
            value={key}
            sx={{ fontSize: 22, px: 2, py: 1 }}
          >
            {icon}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}
