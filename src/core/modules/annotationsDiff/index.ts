import { annotationsDiffType } from './annotationsDiffType';
import { annotationsDiffGenerator } from './generator';
import { applyToAnnotations, buildAnnotationsDiff, computeAnnotationsDiff, inverse, squash } from './lib';

export { annotationsDiffModule };

export type { annotationsDiffType };

const annotationsDiffModule = {
  generator: annotationsDiffGenerator,
  lib: {
    applyToAnnotations,
    buildAnnotationsDiff,
    computeAnnotationsDiff,
    inverse,
    squash,
  },
};
