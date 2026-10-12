import React, { ReactNode, CSSProperties } from 'react';
import { SvgIcon } from '@mui/material';

export { SvgImage };

function SvgImage(props: { children: ReactNode; style: CSSProperties }) {
  return <SvgIcon style={props.style}>{props.children}</SvgIcon>;
}
