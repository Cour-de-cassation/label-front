import { PaletteOptions } from '@mui/material';
import { blueGrey, common, cyan, grey, lightGreen, orange, pink, red } from '@mui/material/colors';
import { displayModeType } from './legacy/types';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
    document: string;
    checklist: string;
  }
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
    document?: string;
    checklist?: string;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    neutral: true;
  }
}

const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: { main: cyan[600], dark: cyan[900] },
  secondary: { main: pink.A400 },
  error: { main: red[500], dark: red[900] },
  warning: { main: orange[500], dark: orange[900] },
  success: { main: lightGreen[500], dark: lightGreen[900] },
  neutral: { main: blueGrey[200], dark: blueGrey[900], contrastText: common.black },
  text: { primary: common.black, secondary: grey[600] },
  background: { default: common.white, paper: common.white },
  divider: grey[600],
  action: { disabled: grey[600], disabledBackground: blueGrey[50] },
  grey: { '300': blueGrey[200] },
  document: blueGrey[50],
  checklist: grey[500],
};

const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: { main: cyan[800], dark: cyan[100] },
  secondary: { main: pink.A400 },
  error: { main: red[500], dark: red[100] },
  warning: { main: orange[500], dark: orange[100] },
  success: { main: lightGreen[500], dark: lightGreen[100] },
  neutral: { main: grey[800], dark: grey[100], contrastText: common.white },
  text: { primary: common.white, secondary: grey[600] },
  background: { default: grey[900], paper: grey[900] },
  divider: grey[600],
  action: { disabled: grey[600], disabledBackground: grey[900] },
  grey: { '300': grey[800] },
  document: common.black,
  checklist: grey[700],
};

export function buildPalette(displayMode: displayModeType): PaletteOptions {
  return displayMode === 'darkMode' ? darkPalette : lightPalette;
}
