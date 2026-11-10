import { colorType, displayModeType } from 'src/types/settings';

export { additionalAnnotationCategoryHandler };
const additionalAnnotationCategoryHandler = buildAdditionalAnnotationCategoryHandler();

function buildAdditionalAnnotationCategoryHandler() {
  const ADDITIONAL_ANNOTATION_CATEGORY_NAME = 'annotationSupplementaire';
  const ADDITIONAL_ANNOTATION_CATEGORY_ICON_NAME = 'pencil' as const;
  const ADDITIONAL_ANNOTATION_CATEGORY_COLOR = {
    lightMode: ['red', '300'] as colorType,
    darkMode: ['red', '700'] as colorType,
  };

  return {
    getCategoryName,
    getCategoryColor,
    getCategoryIconName,
  };

  function getCategoryName() {
    return ADDITIONAL_ANNOTATION_CATEGORY_NAME;
  }

  function getCategoryColor(displayMode: displayModeType) {
    return ADDITIONAL_ANNOTATION_CATEGORY_COLOR[displayMode];
  }

  function getCategoryIconName() {
    return ADDITIONAL_ANNOTATION_CATEGORY_ICON_NAME;
  }
}
