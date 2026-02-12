import { assignationType } from '../assignationType';

export { buildAssignation };

function buildAssignation(assignationFields: Omit<assignationType, '_id'>): assignationType {
  return {
    ...assignationFields,
    _id: 'monId123',
  };
}
