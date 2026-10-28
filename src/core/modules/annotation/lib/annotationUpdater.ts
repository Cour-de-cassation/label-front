import { annotationType } from '../annotationType';
import { entityIdHandler } from './entityIdHandler';

export { annotationUpdater };

const annotationUpdater = {
  updateAnnotationsCategory,
};

function updateAnnotationsCategory(
  annotations: annotationType[],
  newCategory: string,
  shouldUpdate: (annotation: annotationType) => boolean,
) {
  const updatedAnnotations: annotationType[] = [];

  return {
    newAnnotations: annotations.map((annotation) => {
      if (shouldUpdate(annotation)) {
        updatedAnnotations.push(annotation);
        return entityIdHandler.syncEntityIdWithCategory({
          ...annotation,
          category: newCategory,
        });
      } else {
        return annotation;
      }
    }),
    updatedAnnotations,
  };
}
