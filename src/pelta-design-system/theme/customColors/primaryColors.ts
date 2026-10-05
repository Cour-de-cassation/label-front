import { displayModeType, shadeColorType } from "../types";

export { primaryColors };

const primaryColors: Record<displayModeType, shadeColorType> = {
  darkMode: ["cyan", "800"],
  lightMode: ["cyan", "600"],
};
