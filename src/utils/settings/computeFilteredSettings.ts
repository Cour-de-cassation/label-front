import { documentType } from 'src/types/document';
import { settingsType } from 'src/types/settings';
import { MOTIVATION_CATEGORY, ADDITIONAL_ANNOTATION_CATEGORY } from 'src/utils/settings/specialCategories';

export function computeFilteredSettings(
  settings: settingsType,
  categoriesToOmit: documentType['decisionMetadata']['categoriesToOmit'],
  additionalTermsToAnnotate: documentType['decisionMetadata']['additionalTermsToAnnotate'],
  motivationOccultation: documentType['decisionMetadata']['motivationOccultation'],
) {
  const settingsForDocument = Object.entries(settings).reduce((accumulator, [category, categorySetting]) => {
    if (categorySetting.status === 'alwaysVisible') {
      return { ...accumulator, [category]: categorySetting };
    }
    if (category === ADDITIONAL_ANNOTATION_CATEGORY.name) {
      if (!!additionalTermsToAnnotate) {
        return {
          ...accumulator,
          [category]: { ...categorySetting, status: 'annotable' as const },
        };
      }
    } else if (category === MOTIVATION_CATEGORY.name) {
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
