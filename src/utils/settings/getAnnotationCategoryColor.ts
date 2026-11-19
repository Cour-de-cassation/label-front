import { displayModeType, settingsType } from 'src/types/settings';

const DEFAULT_ANNOTATION_COLOR = ['grey', 700];

export function getAnnotationCategoryColor(category: string, settings: settingsType, displayMode: displayModeType) {
  return settings[category]?.color[displayMode] || DEFAULT_ANNOTATION_COLOR;
}
