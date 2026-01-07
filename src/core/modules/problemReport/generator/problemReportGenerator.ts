import { ObjectId } from 'bson';
import { generatorType } from '../../../types';
import { problemReportType } from '../problemReportType';

export { problemReportGenerator };

const problemReportGenerator: generatorType<problemReportType> = {
  generate: ({ documentId, userId, _id, date, hasBeenRead, text, type } = {}) => {
    return {
      documentId: documentId ? new ObjectId(documentId) : new ObjectId(),
      userId: userId ? new ObjectId(userId) : new ObjectId(),
      date: date ?? Date.now(),
      hasBeenRead: hasBeenRead ?? false,
      _id: _id ? new ObjectId(_id) : new ObjectId(),
      text: text ?? `TEXT_${Math.random()}`,
      type: type ?? 'bug',
    };
  },
};
