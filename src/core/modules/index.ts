import { annotationModule, annotationType } from './annotation';
import { annotationsDiffModule, annotationsDiffType } from './annotationsDiff';
import { assignationType } from './assignation/assignationType';
import { preAssignationType } from './preAssignation/preAssignationType';
import { documentModule, documentType } from './document';
import { ressourceFilterType } from './ressourceFilter/ressourceFilterType';
import { problemReportType } from './problemReport/problemReportType';
import { displayModeType, settingsModule, settingsType } from './settings';
import { statisticType } from './statistic/statisticType';
import { userType } from './user';
export { annotationModule, annotationsDiffModule, documentModule, settingsModule };

export type {
  annotationType,
  annotationsDiffType,
  assignationType,
  preAssignationType,
  displayModeType,
  documentType,
  ressourceFilterType,
  problemReportType,
  settingsType,
  statisticType,
  userType,
};
