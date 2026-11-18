import { categoryIconNameType, categorySettingType } from 'src/types/settings';

type specialCategoryType = {
  name: string;
  iconName: categoryIconNameType;
  color: categorySettingType['color'];
};

export const MOTIVATION_CATEGORY: specialCategoryType = {
  name: 'motivations',
  iconName: 'eyeoff',
  color: {
    lightMode: ['yellow', '300'],
    darkMode: ['yellow', '900'],
  },
};

export const ADDITIONAL_ANNOTATION_CATEGORY: specialCategoryType = {
  name: 'annotationSupplementaire',
  iconName: 'pencil',
  color: {
    lightMode: ['red', '300'],
    darkMode: ['red', '700'],
  },
};
