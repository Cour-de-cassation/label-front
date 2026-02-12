import { ObjectId } from 'bson';
import { generatorType } from '../../../types';
import { preAssignationType } from '../preAssignationType';

export { preAssignationGenerator };

const preAssignationGenerator: generatorType<preAssignationType> = {
  generate: ({ _id, userId, number, source, creationDate } = {}) => ({
    _id: _id ? new ObjectId(_id).toHexString() : new ObjectId().toHexString(),
    userId: userId ? new ObjectId(userId).toHexString() : new ObjectId().toHexString(),
    number: number ?? Math.floor(Math.random() * 1000000).toString(),
    source: source ?? `SOURCE_${Math.random()}`,
    creationDate: creationDate ?? new Date().getTime(),
  }),
};
