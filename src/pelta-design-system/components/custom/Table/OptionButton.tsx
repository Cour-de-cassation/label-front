import React, { ReactElement } from 'react';
import { IconDropdown } from '../IconDropdown';
import { wordings } from 'src/client/wordings';

export { OptionButton };

function OptionButton<T extends string>(props: {
  items: Array<{
    icon?: ReactElement;
    text: string;
    value: T;
    isDisabled?: boolean;
  }>;
  onSelect: (value: T) => void;
  onClose?: () => void;
}) {
  return (
    <IconDropdown
      onClose={props.onClose}
      hint={wordings.shared.moreOptions}
      items={props.items}
      iconName="moreVert"
      onChange={props.onSelect}
    />
  );
}
