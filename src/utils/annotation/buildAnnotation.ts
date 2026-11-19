import { computeEntityId } from 'src/utils/annotation/entityIdHandler';

export function buildAnnotation({
  category,
  start,
  text,
  score,
  entityId,
  source,
}: {
  category: string;
  start: number;
  text: string;
  score: number;
  entityId?: string;
  source: string;
}) {
  return {
    category,
    entityId: entityId ?? computeEntityId(category, text),
    start,
    text,
    score,
    source: source,
  };
}
