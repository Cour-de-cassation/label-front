import { problemReportType } from '../problemReportType';

export { buildProblemReport };

function buildProblemReport(assignationFields: Omit<problemReportType, '_id'>): problemReportType {
  return {
    ...assignationFields,
    _id: 'monId123',
  };
}
