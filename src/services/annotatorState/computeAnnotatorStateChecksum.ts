import { annotatorStateType } from './annotatorStateType';
import { sortAnnotations } from 'src/utils/annotation/sortAnnotations';

export function computeAnnotatorStateChecksum(annotatorState: annotatorStateType) {
  const annotations = annotatorState.annotations;
  return JSON.stringify(sortAnnotations(annotations));
}
