import { ObjectId } from 'bson';
import { assignationType } from '../assignationType';

export { buildAssignation };

function buildAssignation(assignationFields: Omit<assignationType, '_id'>): assignationType {
  return {
    ...assignationFields,
    _id: new ObjectId().toHexString(),
  };
}
