import { Checkbox as MuiCheckbox, FormControlLabel } from '@mui/material';
import React, { CSSProperties, ReactElement, useState } from 'react';

export { Checkbox };

function Checkbox(props: {
  defaultChecked: boolean;
  onChange: (checked: boolean) => void;
  text?: string;
  style?: CSSProperties;
}): ReactElement {
  const [checked, setChecked] = useState(props.defaultChecked);

  if (props.text) {
    return (
      <FormControlLabel
        control={<MuiCheckbox checked={checked} color="secondary" />}
        label={props.text}
        onChange={handleChange}
        style={props.style}
      />
    );
  }
  return <MuiCheckbox checked={checked} color="secondary" onChange={handleChange} style={props.style} />;

  function handleChange(event: any, checked: boolean) {
    setChecked(checked);
    props.onChange(checked);
  }
}
