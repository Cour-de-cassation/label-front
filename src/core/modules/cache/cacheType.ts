import { ObjectId } from 'bson';

export type cacheType = {
  _id: ObjectId;
  key: string;
  updateDate: number;
  content: string;
};
