import { documentGenerator, decisionMetadataGenerator, checklistGenerator } from './generator';
import { documentModelCommonFieldsType, documentType } from './documentType';
import {
  buildDocument,
  comparator,
  computeCaseNumber,
  countWords,
  getNextStatus,
  getMinutesBeforeFreeingPendingDocuments,
  publicationHandler,
} from './lib';

export { documentModule };

export type { documentType, documentModelCommonFieldsType };

const documentModule = {
  generator: documentGenerator,
  decisionMetadataGenerator: decisionMetadataGenerator,
  checklistGenerator: checklistGenerator,
  lib: {
    buildDocument,
    comparator,
    computeCaseNumber,
    countWords,
    getNextStatus,
    getMinutesBeforeFreeingPendingDocuments,
    publicationHandler,
  },
};
