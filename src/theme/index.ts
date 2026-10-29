import { ThemeProvider } from './ThemeProvider';
import { useDisplayMode } from './displayMode';
import { heights } from './layout';
import { emphasizeShadeColor, getColor } from './legacy/palette';
import { typographyType, typography } from './legacy/typography';
import { useCustomTheme, customThemeType } from './legacy/theme';
import {
  colorType,
  constantColorType,
  shadeColorType,
  displayModeType,
  positionType,
  rectPositionType,
} from './legacy/types';

export { emphasizeShadeColor, getColor, heights, typography, useCustomTheme, ThemeProvider, useDisplayMode };

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
