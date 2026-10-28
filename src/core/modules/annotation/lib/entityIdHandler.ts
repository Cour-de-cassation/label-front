import { annotationType } from '../annotationType';
import { normalizeString } from '../../../lib/stringComparator/normalizeString';
import { motivationCategoryHandler } from '../../settings/lib';

export { entityIdHandler };

const entityIdHandler = {
  compute,
  syncEntityIdWithCategory,
};

function compute(category: string, text: string) {
  if (category === motivationCategoryHandler.getCategoryName()) {
    return `${category}_${text.length}`;
  }
  return `${category}_${normalizeString(text.toLocaleLowerCase())}`;
}

function syncEntityIdWithCategory(annotation: annotationType): annotationType {
  return {
    ...annotation,
    entityId: compute(annotation.category, annotation.text),
  };
}
