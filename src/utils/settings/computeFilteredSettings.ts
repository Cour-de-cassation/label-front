import { documentType } from 'src/types/document';
import { settingsType } from 'src/types/settings';
import { additionalAnnotationCategoryHandler } from 'src/utils/settings/additionalAnnotationCategoryHandler';
import { motivationCategoryHandler } from 'src/utils/settings/motivationCategoryHandler';

export { computeFilteredSettings };

function computeFilteredSettings(
  settings: settingsType,
  categoriesToOmit: documentType['decisionMetadata']['categoriesToOmit'],
  additionalTermsToAnnotate: documentType['decisionMetadata']['additionalTermsToAnnotate'],
  motivationOccultation: documentType['decisionMetadata']['motivationOccultation'],
) {
  const settingsForDocument = Object.entries(settings).reduce((accumulator, [category, categorySetting]) => {
    if (categorySetting.status === 'alwaysVisible') {
      return { ...accumulator, [category]: categorySetting };
    }
    if (category === additionalAnnotationCategoryHandler.getCategoryName()) {
      if (!!additionalTermsToAnnotate) {
        return {
          ...accumulator,
          [category]: { ...categorySetting, status: 'annotable' as const },
        };
      }
    } else if (category === motivationCategoryHandler.getCategoryName()) {
      if (motivationOccultation === true) {
        return {
          ...accumulator,
          [category]: { ...categorySetting, status: 'annotable' as const },
        };
      } else {
        return { ...accumulator, [category]: categorySetting };
      }
    } else if (!categoriesToOmit.includes(category)) {
      return {
        ...accumulator,
        [category]: { ...categorySetting, status: 'annotable' as const },
      };
    }
    return { ...accumulator, [category]: categorySetting };
  }, {} as settingsType);
  return settingsForDocument;
}
