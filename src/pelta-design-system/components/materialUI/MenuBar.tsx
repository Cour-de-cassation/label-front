import React, { ReactNode } from 'react';
import { AppBar, PropTypes } from '@mui/material';
import { zIndices } from './constants';
import { customThemeType, useCustomTheme } from '../../theme';

export { MenuBar };

function MenuBar(props: { children: ReactNode; color?: PropTypes.Color; isElevated: boolean }) {
  const theme = useCustomTheme();
  const styles = buildStyles();
  const sx = buildSx(theme, props.isElevated);
  return (
    <AppBar sx={sx} position="relative" style={styles.appBar} color={props.color}>
      {props.children}
    </AppBar>
  );

  function buildStyles() {
    return {
      appBar: {
        zIndex: zIndices.menuBar,
      },
    };
  }
}

function buildSx(theme: customThemeType, isElevated: boolean) {
  return {
    boxShadow: isElevated ? theme.boxShadow.major.out : 'none',
  };
}
