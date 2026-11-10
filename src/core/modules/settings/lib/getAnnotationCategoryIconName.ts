import { settingsType } from 'src/types/settings';

export { getAnnotationCategoryIconName };

const DEFAULT_ANNOTATION_ICON_NAME = 'forbidden';

function getAnnotationCategoryIconName(category: string, settings: settingsType) {
  return settings[category]?.iconName || DEFAULT_ANNOTATION_ICON_NAME;
}
