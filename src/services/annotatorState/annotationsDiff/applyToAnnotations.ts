import { annotationModule } from 'src/core/modules/annotation';
import { annotationType } from 'src/types/annotation';
import { annotationsDiffType } from 'src/types/annotationsDiff';

export { applyToAnnotations };

function applyToAnnotations(annotations: annotationType[], annotationsDiff: annotationsDiffType): annotationType[] {
  const newAnnotations = annotations.filter((annotation) => !annotationsDiff.before.includes(annotation));
  newAnnotations.push(...annotationsDiff.after);

  return annotationModule.lib.sortAnnotations(newAnnotations);
}
