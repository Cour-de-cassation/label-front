import { annotationType, annotationsDiffType } from 'src/types/annotation';
import { comparator } from 'src/utils/annotation/comparator';

export function squash(annotationsDiffs: annotationsDiffType[]): annotationsDiffType {
  return annotationsDiffs.reduce(
    (accumulator, annotationsDiff) => {
      const updatedBefore = [...accumulator.before, ...annotationsDiff.before];
      const updatedAfter = [...accumulator.after, ...annotationsDiff.after];
      return {
        before: updatedBefore.filter(
          (annotation) => !updatedAfter.some((anotherAnnotation) => comparator.equal(anotherAnnotation, annotation)),
        ),
        after: updatedAfter.filter(
          (annotation) => !updatedBefore.some((anotherAnnotation) => comparator.equal(anotherAnnotation, annotation)),
        ),
      };
    },
    { before: [] as annotationType[], after: [] as annotationType[] },
  );
}
