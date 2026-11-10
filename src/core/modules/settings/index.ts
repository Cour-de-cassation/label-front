import {
  additionalAnnotationCategoryHandler,
  buildSettings,
  computeFilteredSettings,
  parseFromJson,
  getAnnotationCategoryColor,
  getAnnotationCategoryIconName,
  getAnnotationCategoryStatus,
  getAnnotationCategoryText,
  getCategories,
  motivationCategoryHandler,
} from './lib';

export { settingsModule };

const settingsModule = {
  lib: {
    additionalAnnotationCategoryHandler,
    buildSettings,
    computeFilteredSettings,
    parseFromJson,
    getAnnotationCategoryColor,
    getAnnotationCategoryIconName,
    getAnnotationCategoryStatus,
    getAnnotationCategoryText,
    getCategories,
    motivationCategoryHandler,
  },
};
