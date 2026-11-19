import { uniq } from 'lodash';
import { annotationLinkHandler } from 'src/utils/annotation/annotationLinkHandler';
import { annotationType } from 'src/types/annotation';

export { computeGenericDocumentInfoEntries };

function computeGenericDocumentInfoEntries(text: string, annotations: annotationType[]) {
  return {
    wordCount: text.split(' ').length,
    annotations: annotations.length,
    linkedEntities: annotationLinkHandler.countLinkedEntities(annotations),
    entities: uniq(annotations.map((annotation) => annotation.entityId)).length,
  };
}
