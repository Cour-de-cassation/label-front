import { annotationType } from 'src/types/annotation';
import { computeEntityId } from 'src/utils/annotation/entityIdHandler';

export function linkAnnotation(annotationSource: annotationType, annotationTarget: annotationType): annotationType {
  return { ...annotationSource, entityId: annotationTarget.entityId };
}

export function unlinkAnnotation(annotation: annotationType): annotationType {
  return {
    ...annotation,
    entityId: computeEntityId(annotation.category, annotation.text),
  };
}
