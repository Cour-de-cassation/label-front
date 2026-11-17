import { annotationType } from 'src/types/annotation';
import { buildAnnotation } from 'src/utils/annotation/buildAnnotation';
import { areOverlapping } from 'src/utils/annotation/areOverlapping';

export function isAnnotationTextOverlappedWithAnyAnnotations(
  annotations: annotationType[],
  annotationStart: number,
  annotationText: string,
) {
  return annotations.some((otherAnnotation) =>
    areOverlapping(
      buildAnnotation({
        category: otherAnnotation.category,
        entityId: otherAnnotation.entityId,
        start: annotationStart,
        text: annotationText,
        score: 1,
        source: otherAnnotation.source,
      }),
      otherAnnotation,
    ),
  );
}
