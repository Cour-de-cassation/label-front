import { use } from 'react';
import { AnonymizerBuilderContext } from './AnonymizerBuilderContextProvider';

export { useAnonymizerBuilder };

function useAnonymizerBuilder() {
  return use(AnonymizerBuilderContext);
}
