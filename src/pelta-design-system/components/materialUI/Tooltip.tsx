import React, { ReactElement } from 'react';
import { Tooltip as MuiTooltip } from '@mui/material';
import { Text } from './Text';

export { Tooltip };

function Tooltip(props: {
  arrow?: boolean;
  placement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';
  title: string;
  children: ReactElement;
}) {
  return (
    <MuiTooltip placement={props.placement} arrow={props.arrow} title={<Text>{props.title}</Text>}>
      <span>{props.children}</span>
    </MuiTooltip>
  );
}
