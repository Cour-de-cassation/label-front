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
import { displayModeType, settingsType } from './settingsType';

export { settingsModule };

export type { displayModeType, settingsType };

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
