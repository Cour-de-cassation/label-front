import { annotationModule, annotationType } from '../../modules/annotation';

export { annotationOverlapDetector };

const annotationOverlapDetector = {
  isAnnotationTextOverlappedWithAnyAnnotations,
};

function isAnnotationTextOverlappedWithAnyAnnotations(
  annotations: annotationType[],
  annotationStart: number,
  annotationText: string,
) {
  return annotations.some((otherAnnotation) =>
    annotationModule.lib.areOverlapping(
      annotationModule.lib.buildAnnotation({
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
