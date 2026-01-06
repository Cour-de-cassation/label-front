import { ObjectId } from 'bson';

export type assignationType = {
  _id: ObjectId;
  documentId: string;
  treatmentId: string;
  userId: string;
  assignationDate: number;
};
