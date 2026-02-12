import { anonymizerType, documentType } from 'src/core';

export type { clientAnonymizerType };

type clientAnonymizerType = anonymizerType<documentType>;
