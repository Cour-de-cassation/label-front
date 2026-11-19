import { settingsType } from 'src/types/settings';
import { annotationType } from 'src/types/annotation';
import { updateAnnotationsCategory } from 'src/utils/annotation/annotationUpdater';
import { buildAnnotation } from 'src/utils/annotation/buildAnnotation';
import { autoLink } from 'src/utils/annotation/autoLinker';
import { getLinkedAnnotationRepresentatives, updateMainLinkEntity } from 'src/utils/annotation/annotationLinkHandler';
import { linkAnnotation } from 'src/utils/annotation/annotationLinker';

export function createAnnotation(
  annotations: annotationType[],
  fields: { category: string; start: number; text: string },
  settings: settingsType,
): annotationType[] {
  const createdAnnotation = buildAnnotation({
    score: 1,
    source: 'agent',
    ...fields,
  });
  const newAnnotations = [createdAnnotation, ...annotations];

  return autoLink([createdAnnotation], newAnnotations, settings);
}

export function createLinkedAnnotations(
  annotations: annotationType[],
  fieldsArray: Array<{ category: string; start: number; text: string }>,
): annotationType[] {
  const createdAnnotations = fieldsArray.map((fields) =>
    buildAnnotation({
      score: 1,
      source: 'agent',
      ...fields,
    }),
  );
  const linkedAnnotations = createdAnnotations.map((annotation, index) => {
    if (index === 0) {
      return annotation;
    }
    return linkAnnotation(annotation, createdAnnotations[0]);
  });
  const newAnnotations = [...annotations, ...linkedAnnotations];

  return newAnnotations;
}

export function createAnnotations(
  annotations: annotationType[],
  category: string,
  annotationTextsAndIndices: { index: number; text: string }[],
  settings: settingsType,
): annotationType[] {
  const createdAnnotations = annotationTextsAndIndices.map(({ index, text }) =>
    buildAnnotation({
      category,
      start: index,
      text,
      score: 1,
      source: 'agent',
    }),
  );
  const newAnnotations = createdAnnotations.concat(annotations);

  return autoLink(createdAnnotations, newAnnotations, settings);
}

export function deleteAnnotationsByTextAndCategory(annotations: annotationType[], annotation: annotationType) {
  const newAnnotations = annotations.filter(
    (anotherAnnotation) =>
      anotherAnnotation.category !== annotation.category || anotherAnnotation.text !== annotation.text,
  );

  const annotationsLinkedToDeletedAnnotation = getLinkedAnnotationRepresentatives(annotation.entityId, newAnnotations);

  if (annotationsLinkedToDeletedAnnotation.length === 0) {
    return newAnnotations;
  } else {
    return updateMainLinkEntity(annotationsLinkedToDeletedAnnotation[0], newAnnotations);
  }
}

export function deleteAnnotationByTextAndStart(annotations: annotationType[], annotation: annotationType) {
  const newAnnotations = annotations.filter(
    (anotherAnnotation) => anotherAnnotation.text !== annotation.text || anotherAnnotation.start !== annotation.start,
  );

  const annotationsLinkedToDeletedAnnotation = getLinkedAnnotationRepresentatives(annotation.entityId, newAnnotations);

  if (annotationsLinkedToDeletedAnnotation.length === 0) {
    return newAnnotations;
  } else {
    return updateMainLinkEntity(annotationsLinkedToDeletedAnnotation[0], newAnnotations);
  }
}

export function deleteAnnotationsByEntityId(annotations: annotationType[], entityId: annotationType['entityId']) {
  return annotations.filter((annotation) => annotation.entityId !== entityId);
}

export function updateEntityCategory(
  annotations: annotationType[],
  entityId: string,
  category: string,
  settings: settingsType,
): annotationType[] {
  const { newAnnotations, updatedAnnotations } = updateAnnotationsCategory(
    annotations,
    category,
    (annotation) => annotation.entityId === entityId,
  );

  return autoLink(updatedAnnotations, newAnnotations, settings);
}

export function getAnnotationIndex(annotations: annotationType[], annotation: annotationType) {
  const sameEntityAnnotations = annotations.filter(
    (anotherAnnotation) => anotherAnnotation.entityId === annotation.entityId,
  );
  const sortedSameEntityAnnotations = sameEntityAnnotations.sort(
    (sameEntityAnnotation1, sameEntityAnnotation2) => sameEntityAnnotation1.start - sameEntityAnnotation2.start,
  );
  const annotationIndex = sortedSameEntityAnnotations.findIndex(
    (sameEntityAnnotation) => sameEntityAnnotation.start === annotation.start,
  );

  return { index: annotationIndex + 1, total: sameEntityAnnotations.length };
}
