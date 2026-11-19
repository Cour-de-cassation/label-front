import { stringComparisonSensitivityType } from 'src/utils/annotation/stringComparator';
import { categoryIconNames, constantColors, shadeColors } from 'src/utils/settings/categoryAppearance';

export type settingsType = {
  [category: string]: categorySettingType;
};

export type categorySettingType = {
  anonymization: string;
  color: { [displayMode in displayModeType]: colorType };
  iconName: categoryIconNameType;
  autoLinkSensitivity?: stringComparisonSensitivityType[];
  isAnonymized?: boolean;
  isSensitive?: boolean;
  order: number | undefined;
  status: 'hidden' | 'visible' | 'alwaysVisible' | 'annotable';
  text: string;
  canBeAnnotatedBy: 'both' | 'NLP' | 'human';
};

export type displayModeType = 'lightMode' | 'darkMode';

export type categoryIconNameType = (typeof categoryIconNames)[number];

export type constantColorType = (typeof constantColors)[number];

export type shadeColorType = [(typeof shadeColors)[number], string];

export type colorType = constantColorType | shadeColorType;
