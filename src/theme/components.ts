import { Components, Theme } from '@mui/material';
import { commonTheme } from './legacy/theme';

const { boxShadow, shape } = commonTheme;

export const components: Components<Theme> = {
  MuiPaper: {
    styleOverrides: { root: { backgroundImage: 'none' } },
  },
  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: ({ theme }) => ({ borderRadius: shape.borderRadius.m, padding: theme.spacing(1, 2) }),
      contained: ({ theme, ownerState }) =>
        ownerState.color && ownerState.color !== 'inherit'
          ? { '&:hover': { color: theme.palette.getContrastText(theme.palette[ownerState.color].dark) } }
          : {},
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        variants: [
          {
            props: { color: 'neutral' },
            style: {
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.neutral.main,
              '&:hover': {
                backgroundColor: theme.palette.neutral.dark,
                color: theme.palette.getContrastText(theme.palette.neutral.dark),
              },
            },
          },
        ],
      }),
    },
  },
  MuiDrawer: {
    styleOverrides: { paper: { boxShadow: boxShadow.minor.out } },
  },
  MuiTooltip: {
    styleOverrides: { tooltip: { fontSize: 16 } },
  },
};
