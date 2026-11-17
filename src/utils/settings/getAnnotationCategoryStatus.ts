import { settingsType } from 'src/types/settings';

export function getAnnotationCategoryStatus(category: string, settings: settingsType) {
  return settings[category]?.status || 'hidden';
}
