import { annotationType, annotationsDiffType } from 'src/types/annotation';
import { sortAnnotations } from 'src/utils/annotation/sortAnnotations';

export function applyToAnnotations(
  annotations: annotationType[],
  annotationsDiff: annotationsDiffType,
): annotationType[] {
  const newAnnotations = annotations.filter((annotation) => !annotationsDiff.before.includes(annotation));
  newAnnotations.push(...annotationsDiff.after);

  return sortAnnotations(newAnnotations);
}
