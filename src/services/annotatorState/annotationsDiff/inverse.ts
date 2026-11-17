import { annotationsDiffType } from 'src/types/annotationsDiff';

export function inverse(annotationsDiff: annotationsDiffType): annotationsDiffType {
  return {
    before: annotationsDiff.after,
    after: annotationsDiff.before,
  };
}
