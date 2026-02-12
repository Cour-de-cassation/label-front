import { generatorType } from '../../../types';
import { preAssignationType } from '../preAssignationType';

export { preAssignationGenerator };

const preAssignationGenerator: generatorType<preAssignationType> = {
  generate: ({ _id, userId, number, source, creationDate } = {}) => ({
    _id: _id ? _id : 'monId123',
    userId: userId ? userId : 'monId123',
    number: number ?? Math.floor(Math.random() * 1000000).toString(),
    source: source ?? `SOURCE_${Math.random()}`,
    creationDate: creationDate ?? new Date().getTime(),
  }),
};
