import { annotationModule, annotationType } from './annotation';
import { annotationsDiffModule, annotationsDiffType } from './annotationsDiff';
import { assignationModule, assignationType } from './assignation';
import { preAssignationType } from './preAssignation/preAssignationType';
import { documentModule, documentType } from './document';
import { ressourceFilterType } from './ressourceFilter/ressourceFilterType';
import { problemReportType } from './problemReport/problemReportType';
import {
  colorType,
  constantColorType,
  displayModeType,
  settingsModule,
  settingsType,
  shadeColorType,
  categoryIconNameType,
} from './settings';
import { statisticType } from './statistic/statisticType';
import { treatmentType } from './treatment/treatmentType';
import { userType } from './user';
export { annotationModule, annotationsDiffModule, assignationModule, documentModule, settingsModule };

export type {
  annotationType,
  annotationsDiffType,
  assignationType,
  preAssignationType,
  colorType,
  constantColorType,
  shadeColorType,
  displayModeType,
  documentType,
  ressourceFilterType,
  problemReportType,
  settingsType,
  statisticType,
  categoryIconNameType,
  userType,
  treatmentType,
};
