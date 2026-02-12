import { generatorType } from '../../../types';
import { problemReportType } from '../problemReportType';

export { problemReportGenerator };

const problemReportGenerator: generatorType<problemReportType> = {
  generate: ({ documentId, userId, _id, date, hasBeenRead, text, type } = {}) => {
    return {
      documentId: documentId ? documentId : 'monId123',
      userId: userId ? userId : 'monId123',
      date: date ?? Date.now(),
      hasBeenRead: hasBeenRead ?? false,
      _id: _id ? _id : 'monId123',
      text: text ?? `TEXT_${Math.random()}`,
      type: type ?? 'bug',
    };
  },
};
