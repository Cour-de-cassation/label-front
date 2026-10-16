import React, { MouseEvent, ReactElement, ReactNode } from 'react';
import { Menu as MUMenu, MenuItem } from '@mui/material';
import { customThemeType, useCustomTheme } from '../../theme';

export { Menu };

function Menu<T extends string>(props: {
  anchorElement: Element | undefined;
  dropdownPosition: 'bottom' | 'top';
  items: Array<{ value: T; element: ReactNode; isDisabled?: boolean }>;
  onChange: (value: T) => void;
  onClose: (event: MouseEvent) => void;
  width?: number;
}): ReactElement {
  const theme = useCustomTheme();
  const menuSx = buildMenuSx(theme);
  const menuItemSx = buildMenuItemSx(theme);
  const dropdownMenuConfiguration = {
    anchorOrigin: { horizontal: 'left', vertical: props.dropdownPosition },
    transformOrigin: {
      horizontal: 'left',
      vertical: oppositePosition(props.dropdownPosition),
    },
  } as const;

  return (
    <MUMenu
      anchorEl={props.anchorElement}
      anchorOrigin={dropdownMenuConfiguration?.anchorOrigin}
      onClose={onClose}
      open={isOpen()}
      sx={menuSx}
      transformOrigin={dropdownMenuConfiguration.transformOrigin}
    >
      {props.items.map(({ value, element, isDisabled }, ind) => (
        <MenuItem
          disabled={isDisabled}
          key={ind}
          value={value}
          onClick={(event: MouseEvent) => handleSelection(event, value)}
          sx={menuItemSx}
        >
          {element}
        </MenuItem>
      ))}
    </MUMenu>
  );

  function buildMenuSx(theme: customThemeType) {
    return {
      '& .MuiMenu-paper': {
        backgroundColor: theme.colors.background,
        maxHeight: '300px',
        width: props.width !== undefined ? `${props.width}px` : undefined,
      },
    };
  }

  function buildMenuItemSx(theme: customThemeType) {
    return {
      borderRadius: `${theme.shape.borderRadius.m}px`,
      margin: `${theme.spacing}px`,
      '&:hover': {
        background: theme.colors.default.hoveredBackground,
        borderRadius: `${theme.shape.borderRadius.m}px`,
        color: theme.colors.default.hoveredTextColor,
      },
    };
  }

  function isOpen() {
    return !!props.anchorElement;
  }

  function handleSelection(event: MouseEvent, value: T) {
    props.onChange(value);
    onClose(event);
  }

  function onClose(event: MouseEvent) {
    event.stopPropagation();
    props.onClose(event);
  }
}

function oppositePosition(position: 'bottom' | 'top') {
  return position === 'bottom' ? 'top' : 'bottom';
}
