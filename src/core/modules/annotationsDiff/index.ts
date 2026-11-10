import { annotationsDiffGenerator } from './generator';
import { applyToAnnotations, buildAnnotationsDiff, computeAnnotationsDiff, inverse, squash } from './lib';

export { annotationsDiffModule };

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
