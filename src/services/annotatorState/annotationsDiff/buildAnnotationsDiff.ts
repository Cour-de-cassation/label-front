import { annotationType, annotationsDiffType } from 'src/types/annotation';
import { sortAnnotations } from 'src/utils/annotation/sortAnnotations';

export function buildAnnotationsDiff(before: annotationType[], after: annotationType[]): annotationsDiffType {
  return {
    before: sortAnnotations(before),
    after: sortAnnotations(after),
  };
}
