import React, { MouseEvent, ReactElement, ReactNode } from 'react';
import { Menu as MUMenu, MenuItem } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
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
  const menuClasses = buildMenuClasses(theme);
  const menuItemClasses = buildMenuItemClasses(theme);
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
      classes={menuClasses}
      onClose={onClose}
      open={isOpen()}
      transformOrigin={dropdownMenuConfiguration.transformOrigin}
    >
      {props.items.map(({ value, element, isDisabled }, ind) => (
        <MenuItem
          disabled={isDisabled}
          classes={menuItemClasses}
          key={ind}
          value={value}
          onClick={(event: MouseEvent) => handleSelection(event, value)}
        >
          {element}
        </MenuItem>
      ))}
    </MUMenu>
  );

  function buildMenuClasses(theme: customThemeType) {
    return makeStyles({
      paper: {
        backgroundColor: theme.colors.background,
        maxHeight: '300px',
        width: `${props.width}px`,
      },
    })();
  }

  function buildMenuItemClasses(theme: customThemeType) {
    return makeStyles({
      root: {
        borderRadius: theme.shape.borderRadius.m,
        margin: theme.spacing,
        '&:hover': {
          background: theme.colors.default.hoveredBackground,
          borderRadius: theme.shape.borderRadius.m,
          color: theme.colors.default.hoveredTextColor,
        },
      },
    })();
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
