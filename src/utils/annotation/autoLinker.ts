import { settingsType } from 'src/types/settings';
import { annotationType } from 'src/types/annotation';
import { normalizeString } from 'src/utils/annotation/normalizeString';
import { isAnnotationLinkedTo, linkEntity } from 'src/utils/annotation/annotationLinkHandler';
import { areInsensitiveEqual, areStringsSimilar } from 'src/utils/annotation/stringComparator';

export function autoLink(
  annotationsToLink: annotationType[],
  annotations: annotationType[],
  settings: settingsType,
): annotationType[] {
  return annotationsToLink.reduce((linkedAnnotations, annotation) => {
    const annotationsToLinkTo = computeAnnotationsToLinkTo(annotation, linkedAnnotations, settings);
    return linkToAnnotations(annotation, annotationsToLinkTo, linkedAnnotations);
  }, annotations);
}

function linkToAnnotations(
  annotation: annotationType,
  annotationsToLinkTo: annotationType[],
  annotations: annotationType[],
) {
  return annotationsToLinkTo.reduce((linkedAnnotations, annotationToLinkTo) => {
    return linkEntity(annotation, annotationToLinkTo, linkedAnnotations);
  }, annotations);
}

function computeAnnotationsToLinkTo(annotation: annotationType, annotations: annotationType[], settings: settingsType) {
  return annotations.filter((someAnnotation) => {
    const { autoLinkSensitivity } = settings[annotation.category];
    return (
      annotation.category === someAnnotation.category &&
      !isAnnotationLinkedTo(annotation, someAnnotation) &&
      autoLinkSensitivity?.reduce((accumulator, stringComparisonSensitivity) => {
        switch (stringComparisonSensitivity.kind) {
          case 'caseInsensitive':
            return accumulator || areInsensitiveEqual(annotation.text, someAnnotation.text);
          case 'levenshteinDistance':
            return (
              accumulator ||
              areStringsSimilar(someAnnotation.text, annotation.text, stringComparisonSensitivity.threshold)
            );
          case 'inclusion':
            return accumulator || isSubWord(annotation, someAnnotation) || isSubWord(someAnnotation, annotation);
        }
      }, false as boolean)
    );
  });
}

function isSubWord(annotation1: annotationType, annotation2: annotationType): boolean {
  return (
    normalizeString(annotation2.text).includes(`${normalizeString(annotation1.text)} `) ||
    normalizeString(annotation2.text).includes(` ${normalizeString(annotation1.text)}`)
  );
}
