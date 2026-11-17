import { settingsType } from 'src/types/settings';

const DEFAULT_ANNOTATION_ICON_NAME = 'forbidden';

export function getAnnotationCategoryIconName(category: string, settings: settingsType) {
  return settings[category]?.iconName || DEFAULT_ANNOTATION_ICON_NAME;
}
