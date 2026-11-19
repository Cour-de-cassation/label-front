import { annotationType } from 'src/types/annotation';
import { computeEntityId } from 'src/utils/annotation/entityIdHandler';

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
    entityId: computeEntityId(annotationFields.category, annotationFields.text),
  };
}
