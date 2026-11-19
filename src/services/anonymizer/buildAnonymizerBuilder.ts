import { anonymizerType, buildAnonymizer } from 'src/services/anonymizer/buildAnonymizer/buildAnonymizer';
import { annotationType } from 'src/types/annotation';
import { documentType } from 'src/types/document';
import { settingsType } from 'src/types/settings';

export type clientAnonymizerType = anonymizerType<documentType>;

export type anonymizerBuilderType = {
  get: () => clientAnonymizerType;
};

export function buildAnonymizerBuilder({
  annotations,
  document,
  settings,
}: {
  annotations: annotationType[];
  document: documentType;
  settings: settingsType;
}): { anonymizerBuilder: anonymizerBuilderType } {
  return {
    anonymizerBuilder: {
      get,
    },
  };

  function get() {
    const seed = document.documentNumber;
    const anonymizer = buildAnonymizer(settings, annotations, seed);
    return anonymizer;
  }
}
