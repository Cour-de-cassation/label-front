import { annotationType } from 'src/types/annotation';
import { sortAnnotations } from 'src/utils/annotation/sortAnnotations';
import { comparator } from 'src/utils/annotation/comparator';

export function computeAnnotationsDiff(previousAnnotations: annotationType[], nextAnnotations: annotationType[]) {
  return {
    before: sortAnnotations(
      previousAnnotations.filter(
        (previousAnnotation) => !nextAnnotations.some((annotation) => comparator.equal(annotation, previousAnnotation)),
      ),
    ),
    after: sortAnnotations(
      nextAnnotations.filter(
        (nextAnnotation) => !previousAnnotations.some((annotation) => comparator.equal(annotation, nextAnnotation)),
      ),
    ),
  };
}
