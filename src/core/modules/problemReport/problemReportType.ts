import { ObjectId } from 'bson';

// je met enum à la place de type...
export type problemReportTypeEnum = 'bug' | 'annotationProblem' | 'suggestion';



export type problemReportType = {
  _id: ObjectId;
  documentId: ObjectId;
  userId: ObjectId;
  date: number;
  text: string;
  hasBeenRead: boolean;
  type: problemReportTypeEnum;
};
