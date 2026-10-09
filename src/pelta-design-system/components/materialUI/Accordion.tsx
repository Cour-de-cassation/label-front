import React, { CSSProperties, ReactElement } from 'react';
import { Accordion as MuiAccordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { customThemeType, useCustomTheme } from '../../theme';

export { Accordion };

function Accordion(props: {
  headerStyle?: CSSProperties;
  header: ReactElement;
  body: ReactElement;
  onChange: (expanded: boolean) => void;
  style?: CSSProperties;
  defaultExpanded?: boolean;
}): ReactElement {
  const theme = useCustomTheme();
  const accordionSx = buildAccordionSx(theme);

  return (
    <MuiAccordion
      onChange={(_event, expanded) => props.onChange(expanded)}
      style={props.style}
      defaultExpanded={props.defaultExpanded}
      sx={accordionSx}
    >
      <AccordionSummary style={props.headerStyle} sx={ACCORDION_HEADER_SX}>
        {props.header}
      </AccordionSummary>
      <AccordionDetails>{props.body}</AccordionDetails>
    </MuiAccordion>
  );
}

const ACCORDION_HEADER_SX = {
  '& .MuiAccordionSummary-content': {
    margin: 0,
    '&.Mui-expanded': {
      margin: 0,
    },
  },
};

function buildAccordionSx(theme: customThemeType) {
  const borderRadius = `${theme.shape.borderRadius.m}px`;

  return {
    backgroundColor: theme.colors.default.background,
    borderRadius,
    '&:first-of-type': {
      borderRadius,
    },
    '&:last-of-type': {
      borderRadius,
    },
  };
}
