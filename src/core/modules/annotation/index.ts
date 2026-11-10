import { annotationGenerator } from './generator';
import {
  annotationLinker,
  annotationUpdater,
  areOverlapping,
  buildAnnotation,
  comparator,
  entityIdHandler,
  sortAnnotations,
} from './lib';

export { annotationModule };

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
  },
};
