import React, { createContext, ReactElement, ReactNode, useState } from 'react';
import { annotationsCommitterType } from './buildAnnotationsCommitter';
import { annotatorStateType } from './annotatorStateType';
import { annotatorStateHandlerType, buildAnnotatorStateHandler } from './buildAnnotatorStateHandler';
import { autoSaverType } from './buildAutoSaver';
import { documentGenerator } from 'src/core/modules/document/generator/documentGenerator';

export const AnnotatorStateHandlerContext = createContext<annotatorStateHandlerType>({
  canRestore: () => false,
  canRevert: () => false,
  get: () => ({
    annotations: [],
    settings: {},
    document: documentGenerator.generate(),
  }),
  getChecksum: () => '',
  reinitialize: () => null,
  restore: () => null,
  revert: () => null,
  set: () => null,
});

export function AnnotatorStateHandlerContextProvider(props: {
  autoSaver: autoSaverType;
  children: ReactNode;
  committer: annotationsCommitterType;
  initialAnnotatorState: annotatorStateType;
}): ReactElement {
  const [annotatorState, setAnnotatorState] = useState(props.initialAnnotatorState);
  const { annotatorStateHandler } = buildAnnotatorStateHandler({
    annotatorState,
    autoSaver: props.autoSaver,
    committer: props.committer,
    setAnnotatorState,
    resetAnnotatorState: () => setAnnotatorState(props.initialAnnotatorState),
  });
  return <AnnotatorStateHandlerContext value={annotatorStateHandler}>{props.children}</AnnotatorStateHandlerContext>;
}
