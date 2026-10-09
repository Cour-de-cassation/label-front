import React, { ChangeEvent, ReactElement } from 'react';
import { Switch as MUSwitch } from '@mui/material';
import { customThemeType, useCustomTheme } from '../../theme';

export { SwitchButton };

function SwitchButton(props: {
  checked: boolean;
  disabled?: boolean;
  color: 'primary' | 'secondary' | 'default';
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}): ReactElement {
  const theme = useCustomTheme();
  const sx = buildSx(theme);

  return (
    <MUSwitch disabled={props.disabled} checked={props.checked} color={props.color} onChange={props.onChange} sx={sx} />
  );

  function buildSx(theme: customThemeType) {
    return {
      width: 50,
      height: 30,
      padding: 0,
      borderRadius: `${theme.shape.borderRadius.m}px`,
      border: '2px solid',
      '& .MuiSwitch-switchBase': {
        color: theme.colors.line.level1,
        position: 'absolute',
        top: '-7px',
        left: '-7px',
        '&.Mui-checked': {
          color: theme.colors.line.level1,
        },
        '&.Mui-checked + .MuiSwitch-track': {
          backgroundColor: theme.colors.primary.background,
          opacity: 1,
        },
      },
      '& .MuiSwitch-thumb': { height: 22, width: 22 },
      '& .MuiSwitch-track': {
        backgroundColor: theme.colors.background,
      },
    } as const;
  }
}
