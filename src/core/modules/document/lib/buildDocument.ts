import { ObjectId } from 'bson';
import { documentType } from '../documentType';

export { buildDocument };

function buildDocument(
  documentFields: Omit<documentType, '_id' | 'status' | 'updateDate' | 'reviewStatus'>,
): documentType {
  return {
    ...documentFields,
    _id: new ObjectId().toHexString(),
    reviewStatus: { hasBeenAmended: false, viewerNames: [] },
    status: 'free',
    updateDate: new Date().getTime(),
  };
}
