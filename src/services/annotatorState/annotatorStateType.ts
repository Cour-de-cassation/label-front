import { annotationType } from 'src/types/annotation';
import { assignationType } from 'src/types/assignation';
import { documentType } from 'src/types/document';
import { settingsType } from 'src/types/settings';

export type { annotatorStateType };

type annotatorStateType = {
  assignationId?: assignationType['_id'];
  annotations: annotationType[];
  document: documentType;
  settings: settingsType;
};
