import { annotationModule } from 'src/core/modules/annotation';
import { annotationType } from 'src/types/annotation';
import { annotationsDiffType } from 'src/types/annotationsDiff';

export { buildAnnotationsDiff };

function buildAnnotationsDiff(before: annotationType[], after: annotationType[]): annotationsDiffType {
  return {
    before: annotationModule.lib.sortAnnotations(before),
    after: annotationModule.lib.sortAnnotations(after),
  };
}
