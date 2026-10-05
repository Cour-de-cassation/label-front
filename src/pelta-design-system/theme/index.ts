import { ThemeProvider } from "./ThemeProvider";
import { useDisplayMode } from "./displayMode";
import { heights } from "./heights";
import { emphasizeShadeColor, getColor } from "./palette";
import { typographyType, typography } from "./typography";
import { useCustomTheme, customThemeType } from "./theme";
import {
  colorType,
  constantColorType,
  shadeColorType,
  displayModeType,
  positionType,
  rectPositionType,
} from "./types";

export {
  emphasizeShadeColor,
  getColor,
  heights,
  typography,
  useCustomTheme,
  ThemeProvider,
  useDisplayMode,
};

export type {
  typographyType,
  customThemeType,
  colorType,
  constantColorType,
  shadeColorType,
  displayModeType,
  positionType,
  rectPositionType,
};
