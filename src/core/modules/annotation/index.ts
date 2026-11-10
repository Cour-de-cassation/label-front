import { annotationGenerator } from './generator';
import { annotationLinker } from 'src/utils/annotation/annotationLinker';
import { annotationUpdater } from 'src/utils/annotation/annotationUpdater';
import { areOverlapping } from 'src/utils/annotation/areOverlapping';
import { buildAnnotation } from 'src/utils/annotation/buildAnnotation';
import { comparator } from 'src/utils/annotation/comparator';
import { entityIdHandler } from 'src/utils/annotation/entityIdHandler';
import { sortAnnotations } from 'src/utils/annotation/sortAnnotations';

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
