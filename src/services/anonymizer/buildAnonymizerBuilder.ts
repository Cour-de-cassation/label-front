import { buildAnonymizer } from 'src/services/anonymizer/buildAnonymizer/buildAnonymizer';
import { annotationType } from 'src/types/annotation';
import { documentType } from 'src/types/document';
import { settingsType } from 'src/types/settings';
import { clientAnonymizerType } from 'src/types/anonymizer';

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
