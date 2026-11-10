import { settingsType } from 'src/types/settings';

export { getAnnotationCategoryText };

function getAnnotationCategoryText(category: string, settings: settingsType) {
  return settings[category]?.text || category;
}
