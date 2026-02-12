import {
  annotationType,
  buildAnonymizer,
  documentModule,
  documentType,
  replacementTermType,
  settingsType,
} from 'src/core';
import { clientAnonymizerType } from '../../types';

export { buildAnonymizerBuilder };

export type { anonymizerBuilderType };

type anonymizerBuilderType = {
  get: () => clientAnonymizerType;
};

function buildAnonymizerBuilder({
  annotations,
  document,
  settings,
}: {
  annotations: annotationType[];
  document: documentType;
  settings: settingsType;
  mandatoryReplacementTerms: replacementTermType[];
}): { anonymizerBuilder: anonymizerBuilderType } {
  return {
    anonymizerBuilder: {
      get,
    },
  };

  function get() {
    const seed = documentModule.lib.computeCaseNumber(document);
    const anonymizer = buildAnonymizer(settings, annotations, seed);
    return anonymizer;
  }
}
