import { ObjectId } from 'bson';
import { omitIdType } from '../../id';
import { assignationType } from '../assignationType';

export { buildAssignation };

function buildAssignation(assignationFields: omitIdType<assignationType>): assignationType {
  return {
    ...assignationFields,
    _id: new ObjectId().toHexString(),
  };
}
