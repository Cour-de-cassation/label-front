import { ObjectId } from 'bson';
import { generatorType } from '../../../types';
import { problemReportType } from '../problemReportType';

export { problemReportGenerator };

const problemReportGenerator: generatorType<problemReportType> = {
  generate: ({ documentId, userId, _id, date, hasBeenRead, text, type } = {}) => {
    return {
      documentId: documentId ? new ObjectId(documentId).toHexString() : new ObjectId().toHexString(),
      userId: userId ? new ObjectId(userId).toHexString() : new ObjectId().toHexString(),
      date: date ?? Date.now(),
      hasBeenRead: hasBeenRead ?? false,
      _id: _id ? new ObjectId(_id).toHexString() : new ObjectId().toHexString(),
      text: text ?? `TEXT_${Math.random()}`,
      type: type ?? 'bug',
    };
  },
};
