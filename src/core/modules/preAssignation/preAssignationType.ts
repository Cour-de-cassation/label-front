import { ObjectId } from 'bson';

export type preAssignationType = {
  _id: ObjectId;
  userId: string;
  number: string;
  source: string;
  creationDate: number;
};
