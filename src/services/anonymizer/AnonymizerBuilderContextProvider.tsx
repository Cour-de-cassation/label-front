import React, { createContext, ReactElement, ReactNode } from 'react';
import { buildAnonymizer } from 'src/core';
import { annotationType } from 'src/types/annotation';
import { documentType } from 'src/types/document';
import { settingsType } from 'src/types/settings';
import { anonymizerBuilderType, buildAnonymizerBuilder } from './buildAnonymizerBuilder';

export { AnonymizerBuilderContext, AnonymizerBuilderContextProvider };

const AnonymizerBuilderContext = createContext<anonymizerBuilderType>({
  get: () => buildAnonymizer({}, [], -1),
});

function AnonymizerBuilderContextProvider({
  annotations,
  children,
  document,
  settings,
}: {
  annotations: annotationType[];
  children: ReactNode;
  document: documentType;
  settings: settingsType;
}): ReactElement {
  const { anonymizerBuilder } = buildAnonymizerBuilder({
    settings,
    annotations,
    document,
  });

  return <AnonymizerBuilderContext value={anonymizerBuilder}>{children}</AnonymizerBuilderContext>;
}
