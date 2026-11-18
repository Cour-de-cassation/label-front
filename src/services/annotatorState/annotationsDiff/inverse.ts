import { annotationsDiffType } from 'src/types/annotation';

export function inverse(annotationsDiff: annotationsDiffType): annotationsDiffType {
  return {
    before: annotationsDiff.after,
    after: annotationsDiff.before,
  };
}
