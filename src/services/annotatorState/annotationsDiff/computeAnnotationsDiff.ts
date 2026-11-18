import { annotationType } from 'src/types/annotation';
import { sortAnnotations } from 'src/utils/annotation/sortAnnotations';
import { areAnnotationsEqual } from 'src/utils/annotation/comparator';

export function computeAnnotationsDiff(previousAnnotations: annotationType[], nextAnnotations: annotationType[]) {
  return {
    before: sortAnnotations(
      previousAnnotations.filter(
        (previousAnnotation) =>
          !nextAnnotations.some((annotation) => areAnnotationsEqual(annotation, previousAnnotation)),
      ),
    ),
    after: sortAnnotations(
      nextAnnotations.filter(
        (nextAnnotation) => !previousAnnotations.some((annotation) => areAnnotationsEqual(annotation, nextAnnotation)),
      ),
    ),
  };
}
