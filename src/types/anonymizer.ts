import { anonymizerType } from 'src/services/anonymizer/buildAnonymizer/buildAnonymizer';
import { documentType } from 'src/types/document';

export type { clientAnonymizerType };

type clientAnonymizerType = anonymizerType<documentType>;
