import { annotationType } from 'src/types/annotation';
import { normalizeString } from 'src/utils/annotation/normalizeString';
import { MOTIVATION_CATEGORY } from 'src/utils/settings/specialCategories';

export function computeEntityId(category: string, text: string) {
  if (category === MOTIVATION_CATEGORY.name) {
    return `${category}_${text.length}`;
  }
  return `${category}_${normalizeString(text.toLocaleLowerCase())}`;
}

export function syncEntityIdWithCategory(annotation: annotationType): annotationType {
  return {
    ...annotation,
    entityId: computeEntityId(annotation.category, annotation.text),
  };
}
