import { ObjectId } from 'bson';
import { preAssignationType } from '../preAssignationType';

export { buildPreAssignation };

function buildPreAssignation(preAssignationFields: Omit<preAssignationType, '_id'>): preAssignationType {
  return {
    ...preAssignationFields,
    _id: new ObjectId().toHexString(),
  };
}
