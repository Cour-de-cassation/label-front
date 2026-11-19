import { uniq } from 'lodash';
import { annotationType } from 'src/types/annotation';
import { countLinkedEntities } from 'src/utils/annotation/annotationLinkHandler';

export { computeGenericDocumentInfoEntries };

function computeGenericDocumentInfoEntries(text: string, annotations: annotationType[]) {
  return {
    wordCount: text.split(' ').length,
    annotations: annotations.length,
    linkedEntities: countLinkedEntities(annotations),
    entities: uniq(annotations.map((annotation) => annotation.entityId)).length,
  };
}
