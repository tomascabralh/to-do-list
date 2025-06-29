// UI Constants
export const UI_CONSTANTS = {
  TITLE_MAX_LENGTH: 40,
  DESCRIPTION_MAX_LENGTH: 100,
  DIALOG_MAX_WIDTH: 396,
  CONTAINER_MAX_WIDTH: 700,
} as const;

// Default values
export const DEFAULTS = {
  ICON: "manzana",
  COLOR: "#FF5E5E",
} as const;

// Colors
export const COLORS = [
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
] as const;

// Icons mapping
export const ICONS = {
  manzana: "AppleIcon",
  agua: "WaterDropIcon",
  viaje: "FlightIcon",
  paseo: "PetsIcon",
  compras: "ShoppingCartIcon",
  pizza: "LocalPizzaIcon",
  corazon: "FavoriteIcon",
  gota: "BloodtypeIcon",
  camara: "CameraAltIcon",
  gato: "PetsIcon",
} as const;
