import { annotationsDiffType } from 'src/types/annotationsDiff';

export { inverse };

function inverse(annotationsDiff: annotationsDiffType): annotationsDiffType {
  return {
    before: annotationsDiff.after,
    after: annotationsDiff.before,
  };
}
