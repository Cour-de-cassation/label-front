import { Components, Theme } from '@mui/material';
import { borderRadius, boxShadow } from './constants';

export const components: Components<Theme> = {
  MuiPaper: {
    styleOverrides: { root: { backgroundImage: 'none' } },
  },
  MuiAppBar: {
    defaultProps: { elevation: 0 },
    styleOverrides: {
      root: ({ theme }) => ({
        zIndex: theme.zIndex.appBar,
        variants: [{ props: ({ elevation }) => !!elevation, style: { boxShadow: boxShadow.major.out } }],
      }),
    },
  },
  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: ({ theme }) => ({ borderRadius: borderRadius.button, padding: theme.spacing(1, 2) }),
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
