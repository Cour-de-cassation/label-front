import { groupBy, uniqBy } from 'lodash';
import { annotationType } from 'src/types/annotation';
import { linkAnnotation, unlinkAnnotation } from 'src/utils/annotation/annotationLinker';
import { computeEntityId } from 'src/utils/annotation/entityIdHandler';
import { areAnnotationsEqual, compareAnnotationsByText } from 'src/utils/annotation/comparator';

export function countLinkedEntities(annotations: annotationType[]) {
  let linkedEntities = 0;
  let representatives = getAnnotationRepresentatives(annotations);

  while (representatives.length !== 0) {
    const representative = representatives[0];
    representatives = representatives.slice(1);
    const linkedRepresentatives = getLinkedAnnotations(representative.entityId, representatives);

    linkedEntities = linkedEntities + linkedRepresentatives.length;
    representatives = representatives.filter((someRepresentative) =>
      linkedRepresentatives.every(
        (linkedRepresentative) => !areAnnotationsEqual(someRepresentative, linkedRepresentative),
      ),
    );
  }

  return linkedEntities;
}

export function getLinkableAnnotations(annotation: annotationType, annotations: annotationType[]): annotationType[] {
  const annotationsWithOtherEntityId = annotations.filter(
    (otherAnnotation) =>
      otherAnnotation.category === annotation.category && otherAnnotation.entityId !== annotation.entityId,
  );
  const annotationsWithOtherEntityIdByEntityId = groupBy(
    annotationsWithOtherEntityId,
    (annotation) => annotation.entityId,
  );
  const linkeableAnnotations = Object.values(annotationsWithOtherEntityIdByEntityId)
    .sort((annotations1, annotations2) => annotations2.length - annotations1.length)
    .map((annotations) => annotations[0]);

  return linkeableAnnotations;
}

export function getLinkedAnnotations(
  entityId: annotationType['entityId'],
  annotations: annotationType[],
): annotationType[] {
  return annotations.filter((otherAnnotation) => otherAnnotation.entityId === entityId);
}

export function getLinkedAnnotationRepresentatives(
  entityId: annotationType['entityId'],
  annotations: annotationType[],
): annotationType[] {
  return uniqBy(getLinkedAnnotations(entityId, annotations), (otherAnnotation) => otherAnnotation.text).sort(
    (annotation1, annotation2) => annotation1.text.localeCompare(annotation2.text),
  );
}

export function getAnnotationRepresentatives(annotations: annotationType[]) {
  return uniqBy(annotations, (otherAnnotation) => computeEntityId(otherAnnotation.category, otherAnnotation.text)).sort(
    compareAnnotationsByText,
  );
}

export function isAnnotationLinked(annotation: annotationType, annotations: annotationType[]): boolean {
  return annotations.some(
    (otherAnnotation) => otherAnnotation.entityId === annotation.entityId && otherAnnotation.text !== annotation.text,
  );
}

export function isAnnotationLinkedTo(annotationSource: annotationType, annotationTarget: annotationType) {
  return annotationSource.entityId === annotationTarget.entityId;
}

export function linkEntity(
  annotationSource: annotationType,
  annotationTarget: annotationType,
  annotations: annotationType[],
): annotationType[] {
  return annotations.map((annotation) =>
    annotation.entityId === annotationSource.entityId ? linkAnnotation(annotation, annotationTarget) : annotation,
  );
}

export function unlinkEntity(annotationToUnlink: annotationType, annotations: annotationType[]): annotationType[] {
  return annotations.map((annotation) =>
    annotation.entityId === annotationToUnlink.entityId ? unlinkAnnotation(annotation) : annotation,
  );
}

export function unlinkAnnotationsByCategoryAndText(annotation: annotationType, annotations: annotationType[]) {
  const linkedAnnotations = getLinkedAnnotationRepresentatives(annotation.entityId, annotations).filter(
    (linkedAnnotation) => linkedAnnotation.start !== annotation.start || linkedAnnotation.text !== annotation.text,
  );

  if (linkedAnnotations.length === 0) {
    return annotations;
  }

  const annotationsWithUpdatedLink = updateMainLinkEntity(linkedAnnotations[0], annotations);

  return annotationsWithUpdatedLink.map((otherAnnotation) =>
    otherAnnotation.category === annotation.category && otherAnnotation.text === annotation.text
      ? unlinkAnnotation(otherAnnotation)
      : otherAnnotation,
  );
}

export function updateMainLinkEntity(annotation: annotationType, annotations: annotationType[]) {
  return annotations.map((otherAnnotation) =>
    otherAnnotation.entityId === annotation.entityId
      ? {
          ...otherAnnotation,
          entityId: computeEntityId(annotation.category, annotation.text),
        }
      : otherAnnotation,
  );
}
