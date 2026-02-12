import { ObjectId } from 'bson';
import { cacheType } from '../cacheType';

export { buildCache };

function buildCache(cacheFields: Omit<cacheType, '_id'>): cacheType {
  return {
    ...cacheFields,
    _id: new ObjectId().toHexString(),
  };
}
