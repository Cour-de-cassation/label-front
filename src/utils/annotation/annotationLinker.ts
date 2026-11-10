import { annotationType } from 'src/types/annotation';
import { entityIdHandler } from 'src/utils/annotation/entityIdHandler';

export { annotationLinker };

const annotationLinker = {
  link,
  unlink,
};

function link(annotationSource: annotationType, annotationTarget: annotationType): annotationType {
  return { ...annotationSource, entityId: annotationTarget.entityId };
}

function unlink(annotation: annotationType): annotationType {
  return {
    ...annotation,
    entityId: entityIdHandler.compute(annotation.category, annotation.text),
  };
}
