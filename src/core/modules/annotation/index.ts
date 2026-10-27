import { annotationType } from './annotationType';
import { annotationGenerator } from './generator';
import {
  annotationLinker,
  annotationUpdater,
  areOverlapping,
  buildAnnotation,
  comparator,
  entityIdHandler,
  sortAnnotations,
  stringify,
} from './lib';

export { annotationModule, buildAnnotation };

export type { annotationType };

const annotationModule = {
  generator: annotationGenerator,
  lib: {
    annotationLinker,
    annotationUpdater,
    areOverlapping,
    buildAnnotation,
    comparator,
    entityIdHandler,
    sortAnnotations,
    stringify,
  },
};
