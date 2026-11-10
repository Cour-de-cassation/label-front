import { colorType, displayModeType } from '../settingsType';

export { motivationCategoryHandler };
const motivationCategoryHandler = buildMotivationCategoryHandler();

function buildMotivationCategoryHandler() {
  const MOTIVATION_CATEGORY_NAME = 'motivations';
  const MOTIVATION_CATEGORY_ICON_NAME = 'eyeoff' as const;
  const MOTIVATION_CATEGORY_COLOR = {
    lightMode: ['yellow', '300'] as colorType,
    darkMode: ['yellow', '900'] as colorType,
  };

  return {
    getCategoryName,
    getCategoryColor,
    getCategoryIconName,
  };

  function getCategoryName() {
    return MOTIVATION_CATEGORY_NAME;
  }

  function getCategoryColor(displayMode: displayModeType) {
    return MOTIVATION_CATEGORY_COLOR[displayMode];
  }

  function getCategoryIconName() {
    return MOTIVATION_CATEGORY_ICON_NAME;
  }
}
