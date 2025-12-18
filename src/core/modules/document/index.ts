import { documentGenerator, decisionMetadataGenerator, checklistGenerator } from './generator';
import { documentModelCommonFieldsType, documentType, fetchedDocumentType } from './documentType';
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

export type { documentType, fetchedDocumentType, documentModelCommonFieldsType };

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
