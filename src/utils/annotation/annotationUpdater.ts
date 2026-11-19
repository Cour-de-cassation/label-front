import { annotationType } from 'src/types/annotation';
import { syncEntityIdWithCategory } from 'src/utils/annotation/entityIdHandler';

export function updateAnnotationsCategory(
  annotations: annotationType[],
  newCategory: string,
  shouldUpdate: (annotation: annotationType) => boolean,
) {
  const updatedAnnotations: annotationType[] = [];

  return {
    newAnnotations: annotations.map((annotation) => {
      if (shouldUpdate(annotation)) {
        updatedAnnotations.push(annotation);
        return syncEntityIdWithCategory({
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
