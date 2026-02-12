import { ObjectId } from 'bson';
import { omitIdType } from '../../id';
import { preAssignationType } from '../preAssignationType';

export { buildPreAssignation };

function buildPreAssignation(preAssignationFields: omitIdType<preAssignationType>): preAssignationType {
  return {
    ...preAssignationFields,
    _id: new ObjectId().toHexString(),
  };
}
