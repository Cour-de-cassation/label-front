import { generatorType } from '../../../types';
import { annotationsDiffType } from 'src/types/annotationsDiff';

export { annotationsDiffGenerator };

const annotationsDiffGenerator: generatorType<annotationsDiffType> = {
  generate: ({ before, after } = {}) => {
    return {
      before: before ? before : [],
      after: after ? after : [],
    };
  },
};
