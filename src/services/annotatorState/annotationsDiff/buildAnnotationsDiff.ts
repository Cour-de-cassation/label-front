import { annotationType } from 'src/types/annotation';
import { annotationsDiffType } from 'src/types/annotationsDiff';
import { sortAnnotations } from 'src/utils/annotation/sortAnnotations';

export function buildAnnotationsDiff(before: annotationType[], after: annotationType[]): annotationsDiffType {
  return {
    before: sortAnnotations(before),
    after: sortAnnotations(after),
  };
}
