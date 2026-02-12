import { generatorType } from '../../../types';
import { cacheType } from '../cacheType';

export { cacheGenerator };

const cacheGenerator: generatorType<cacheType> = {
  generate: ({ key, _id, updateDate, content } = {}) => ({
    key: key ?? 'random' + Math.floor(Math.random() * 10000),
    _id: _id ? _id : 'monId123',
    updateDate: updateDate ?? new Date().getTime(),
    content: content ?? '',
  }),
};
