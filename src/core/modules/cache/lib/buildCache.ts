import { ObjectId } from 'bson';
import { omitIdType } from '../../id';
import { cacheType } from '../cacheType';

export { buildCache };

function buildCache(cacheFields: omitIdType<cacheType>): cacheType {
  return {
    ...cacheFields,
    _id: new ObjectId(),
  };
}
