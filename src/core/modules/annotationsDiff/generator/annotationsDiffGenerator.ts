import { annotationsDiffType } from 'src/types/annotationsDiff';
import { generatorType } from 'src/core/types/generatorType';

export { annotationsDiffGenerator };

const annotationsDiffGenerator: generatorType<annotationsDiffType> = {
  generate: ({ before, after } = {}) => {
    return {
      before: before ? before : [],
      after: after ? after : [],
    };
  },
};
