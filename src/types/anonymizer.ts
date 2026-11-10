import { anonymizerType } from 'src/core';
import { documentType } from 'src/types/document';

export type { clientAnonymizerType };

type clientAnonymizerType = anonymizerType<documentType>;
