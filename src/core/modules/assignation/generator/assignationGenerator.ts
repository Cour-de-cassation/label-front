import { ObjectId } from 'bson';
import { generatorType } from '../../../types';
import { assignationType } from '../assignationType';

export { assignationGenerator };

const assignationGenerator: generatorType<assignationType> = {
  generate: ({ documentId, _id, treatmentId, userId, assignationDate } = {}) => ({
    documentId: documentId ?? new ObjectId().toHexString(),
    _id: _id ? new ObjectId(_id) : new ObjectId(),
    treatmentId: treatmentId ?? new ObjectId().toHexString(),
    userId: userId ?? new ObjectId().toHexString(),
    assignationDate: assignationDate ?? new Date().getTime(),
  }),
};
