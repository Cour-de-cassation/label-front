import { ObjectId } from 'bson';
import { problemReportType } from '../problemReportType';

export { buildProblemReport };

function buildProblemReport(assignationFields: Omit<problemReportType, '_id'>): problemReportType {
  return {
    ...assignationFields,
    _id: new ObjectId().toHexString(),
  };
}
