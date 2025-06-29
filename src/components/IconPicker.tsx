import { Box, ToggleButton } from "@mui/material";
import { IconPickerProps } from "../types";
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

const ICONS = [
  { key: "manzana", icon: Apple },
  { key: "agua", icon: WaterDrop },
  { key: "viaje", icon: Flight },
  { key: "paseo", icon: Pets },
  { key: "compras", icon: ShoppingCart },
  { key: "pizza", icon: LocalPizza },
  { key: "corazon", icon: Favorite },
  { key: "gota", icon: Bloodtype },
  { key: "camara", icon: CameraAlt },
  { key: "gato", icon: Cat },
];

export default function IconPicker({
  value,
  onChange,
  selectedColor = "#FF5E5E",
}: IconPickerProps) {
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
        {ICONS.map(({ key, icon: IconComponent }) => (
          <ToggleButton
            key={key}
            value={key}
            selected={value === key}
            onClick={() => onChange(key)}
            sx={{
              fontSize: 22,
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
            <IconComponent
              sx={{
                fontSize: 20,
                color: value === key ? selectedColor : "#888",
              }}
            />
          </ToggleButton>
        ))}
      </Box>
    </Box>
  );
}
