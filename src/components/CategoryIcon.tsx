import React from 'react';
import { settingsType } from 'src/types/settings';
import { getColor, useDisplayMode, CircleIcon } from 'src/pelta-design-system';
import { getAnnotationCategoryIconName } from 'src/utils/settings/getAnnotationCategoryIconName';
import { getAnnotationCategoryColor } from 'src/utils/settings/getAnnotationCategoryColor';

export { CategoryIcon };

function CategoryIcon(props: { settings: settingsType; category: string; iconSize: number; isDisabled?: boolean }) {
  const { displayMode } = useDisplayMode();
  const backgroundColor = getColor(getAnnotationCategoryColor(props.category, props.settings, displayMode));

  return (
    <CircleIcon
      isDisabled={props.isDisabled}
      backgroundColor={backgroundColor}
      iconSize={props.iconSize}
      iconName={getAnnotationCategoryIconName(props.category, props.settings)}
    />
  );
}
