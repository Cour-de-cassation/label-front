import { ObjectId } from 'bson';

export type problemReportType = {
  _id: ObjectId;
  documentId: ObjectId;
  userId: ObjectId;
  date: number;
  text: string;
  hasBeenRead: boolean;
  type: 'bug' | 'annotationProblem' | 'suggestion';
};
