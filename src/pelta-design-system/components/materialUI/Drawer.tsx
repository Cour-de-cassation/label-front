import React, { ReactNode } from 'react';
import { Drawer as MuiDrawer } from '@mui/material';
import { customThemeType, heights, useCustomTheme } from '../../theme';
import { IconButton, Text } from '..';
import { zIndices } from './constants';
import { wordings } from 'src/client/wordings';

export { Drawer };

function Drawer(props: {
  children?: ReactNode;
  subtitle?: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const theme = useCustomTheme();
  const styles = buildStyles();
  const sx = buildSx(theme);

  return (
    <MuiDrawer style={styles.drawer} sx={sx} anchor="right" open={props.isOpen} onClose={props.onClose}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <Text variant="h1">{props.title}</Text>
            {props.subtitle && (
              <Text variant="h3" style={styles.subtitle}>
                {props.subtitle}
              </Text>
            )}
          </div>
          <div>
            <IconButton hint={wordings.shared.cancel} onClick={props.onClose} iconName="close" />
          </div>
        </div>
        <div style={styles.content}>{props.children}</div>
      </div>
    </MuiDrawer>
  );

  function buildStyles() {
    return {
      drawer: {
        zIndex: zIndices.drawer,
      },
      container: {
        paddingLeft: theme.spacing * 8,
        paddingRight: theme.spacing * 8,
        height: 'inherit',
        display: 'flex',
        flexDirection: 'column',
      },
      subtitle: {
        display: 'inherit',
      },
      content: {
        overflow: 'auto',
        paddingBottom: theme.spacing * 4,
      },
      header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: theme.spacing * 3,
        marginTop: theme.spacing * 4,
        borderBottom: 'solid 1px',
        borderBottomColor: theme.colors.separator,
        width: '100%',
      },
    } as const;
  }

  function buildSx(theme: customThemeType) {
    return {
      '& .MuiDrawer-paper': {
        boxShadow: theme.boxShadow.minor.out,
        marginTop: heights.header,
        height: heights.adminPanel,
      },
    };
  }
}
