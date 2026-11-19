import { additionalAnnotationCategoryHandler } from 'src/utils/settings/additionalAnnotationCategoryHandler';
import { buildSettings } from 'src/utils/settings/buildSettings';
import { computeFilteredSettings } from 'src/utils/settings/computeFilteredSettings';
import { parseFromJson } from 'src/utils/settings/parseFromJson';
import { getAnnotationCategoryColor } from 'src/utils/settings/getAnnotationCategoryColor';
import { getAnnotationCategoryIconName } from 'src/utils/settings/getAnnotationCategoryIconName';
import { getAnnotationCategoryStatus } from 'src/utils/settings/getAnnotationCategoryStatus';
import { getAnnotationCategoryText } from 'src/utils/settings/getAnnotationCategoryText';
import { getCategories } from 'src/utils/settings/getCategories';
import { motivationCategoryHandler } from 'src/utils/settings/motivationCategoryHandler';

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
