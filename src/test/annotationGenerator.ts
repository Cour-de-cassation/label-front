import { entityIdHandler } from 'src/utils/annotation/entityIdHandler';
import { annotationType } from 'src/types/annotation';

export function generateAnnotation({
  category,
  start,
  text,
  score,
  source,
}: Partial<annotationType> = {}): annotationType {
  const annotationFields = {
    category: category ? category : `CATEGORY_${Math.random()}`,
    start: start ? start : 0,
    text: text ? text : `TEXT_${Math.random()}`,
    score: score ?? 1,
    source: source ?? 'agent',
  };

  return {
    ...annotationFields,
    entityId: entityIdHandler.compute(annotationFields.category, annotationFields.text),
  };
}
