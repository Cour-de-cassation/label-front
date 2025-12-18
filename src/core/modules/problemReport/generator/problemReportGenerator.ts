import { ObjectId } from 'bson';
import { generatorType } from '../../../types';
import { idModule } from '../../id';
import { problemReportType } from '../problemReportType';

export { problemReportGenerator };

const problemReportGenerator: generatorType<problemReportType> = {
  generate: ({ documentId, userId, _id, date, hasBeenRead, text, type } = {}) => {
    return {
      documentId: new ObjectId(documentId),
      userId: new ObjectId(userId),
      date: date ? date : new Date().getTime(),
      hasBeenRead: hasBeenRead ? hasBeenRead : false,
      _id: _id ? new ObjectId(_id) : new ObjectId(),
      text: text ? text : `TEXT_${Math.random()}`,
      type: type ? type : 'bug',
    };
  },
};
