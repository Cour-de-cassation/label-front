import { settingsType } from 'src/types/settings';

export function getAnnotationCategoryText(category: string, settings: settingsType) {
  return settings[category]?.text || category;
}
