import { annotationType, assignationType, documentType, replacementTermType, settingsType } from 'src/core';

export type { annotatorStateType };

type annotatorStateType = {
  assignationId?: assignationType['_id'];
  annotations: annotationType[];
  document: documentType;
  settings: settingsType;
  mandatoryReplacementTerms: replacementTermType[];
};
