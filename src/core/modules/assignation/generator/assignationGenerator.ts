import { generatorType } from '../../../types';
import { assignationType } from '../assignationType';

export { assignationGenerator };

const assignationGenerator: generatorType<assignationType> = {
  generate: ({ documentId, _id, treatmentId, userId, assignationDate } = {}) => ({
    documentId: documentId ?? 'monId123',
    _id: _id ? _id : 'monId123',
    treatmentId: treatmentId ?? 'monId123',
    userId: userId ?? 'monId123',
    assignationDate: assignationDate ?? new Date().getTime(),
  }),
};
