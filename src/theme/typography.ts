import { ThemeOptions } from '@mui/material';

export const typography: ThemeOptions['typography'] = {
  fontFamily: 'Luciole, sans-serif',
  allVariants: { lineHeight: 'normal', letterSpacing: 'normal' },
  body1: { fontSize: 16 },
  body2: { fontFamily: '"Courier New", monospace', fontSize: 16, lineHeight: '19px' },
  h1: { fontSize: 24, fontWeight: 'normal' },
  h2: { fontSize: 16, fontWeight: 'normal' },
  h3: { fontSize: 12, fontWeight: 'normal' },
  button: { fontSize: 16, textTransform: 'none' },
};
