import { entityIdHandler } from 'src/utils/annotation/entityIdHandler';

export { buildAnnotation };

function buildAnnotation({
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
    entityId: entityId ?? entityIdHandler.compute(category, text),
    start,
    text,
    score,
    source: source,
  };
}
