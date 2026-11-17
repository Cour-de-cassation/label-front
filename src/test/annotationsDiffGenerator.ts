import { annotationsDiffType } from 'src/types/annotationsDiff';

export function generateAnnotationsDiff({ before, after }: Partial<annotationsDiffType> = {}): annotationsDiffType {
  return {
    before: before ? before : [],
    after: after ? after : [],
  };
}
