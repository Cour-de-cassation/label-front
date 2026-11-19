import { settingsType } from 'src/types/settings';

export { getAnnotationCategoryStatus };

function getAnnotationCategoryStatus(category: string, settings: settingsType) {
  return settings[category]?.status || 'hidden';
}
