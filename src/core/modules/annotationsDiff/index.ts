import { annotationsDiffGenerator } from './generator';
import { applyToAnnotations } from 'src/services/annotatorState/annotationsDiff/applyToAnnotations';
import { buildAnnotationsDiff } from 'src/services/annotatorState/annotationsDiff/buildAnnotationsDiff';
import { computeAnnotationsDiff } from 'src/services/annotatorState/annotationsDiff/computeAnnotationsDiff';
import { inverse } from 'src/services/annotatorState/annotationsDiff/inverse';
import { squash } from 'src/services/annotatorState/annotationsDiff/squash';

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
