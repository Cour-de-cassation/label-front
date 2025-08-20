import { anonymizerType, fetchedDocumentType } from 'src/core';

export type { clientAnonymizerType };

type clientAnonymizerType = anonymizerType<fetchedDocumentType>;
