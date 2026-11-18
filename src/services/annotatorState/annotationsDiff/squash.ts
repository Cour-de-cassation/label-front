import { annotationType, annotationsDiffType } from 'src/types/annotation';
import { areAnnotationsEqual } from 'src/utils/annotation/comparator';

export function squash(annotationsDiffs: annotationsDiffType[]): annotationsDiffType {
  return annotationsDiffs.reduce(
    (accumulator, annotationsDiff) => {
      const updatedBefore = [...accumulator.before, ...annotationsDiff.before];
      const updatedAfter = [...accumulator.after, ...annotationsDiff.after];
      return {
        before: updatedBefore.filter(
          (annotation) => !updatedAfter.some((anotherAnnotation) => areAnnotationsEqual(anotherAnnotation, annotation)),
        ),
        after: updatedAfter.filter(
          (annotation) =>
            !updatedBefore.some((anotherAnnotation) => areAnnotationsEqual(anotherAnnotation, annotation)),
        ),
      };
    },
    { before: [] as annotationType[], after: [] as annotationType[] },
  );
}
