import { createTheme } from '@mui/material';
import { displayModeType } from './legacy/types';
import { components } from './components';
import { buildPalette } from './palette';
import { typography } from './typography';

export function buildMuiTheme(displayMode: displayModeType) {
  return createTheme({
    shape: { borderRadius: 8 },
    spacing: 8,
    zIndex: { appBar: 20, drawer: 10 },
    palette: buildPalette(displayMode),
    typography,
    components,
  });
}
