import { use } from 'react';
import { AnnotatorStateHandlerContext } from './AnnotatorStateHandlerContextProvider';

export function useAnnotatorStateHandler() {
  const annotatorStateHandler = use(AnnotatorStateHandlerContext);
  if (!annotatorStateHandler) {
    throw new Error('useAnnotatorStateHandler must be used inside AnnotatorStateHandlerContextProvider');
  }
  return annotatorStateHandler;
}
