import { documentType } from './documentType';
import { checklistGenerator, decisionMetadataGenerator, documentGenerator } from './generator/documentGenerator';
import { getNextStatus, getMinutesBeforeFreeingPendingDocuments, publicationHandler } from './lib';

export { documentModule };

export type { documentType };

const documentModule = {
  generator: documentGenerator,
  decisionMetadataGenerator: decisionMetadataGenerator,
  checklistGenerator: checklistGenerator,
  lib: {
    getNextStatus,
    getMinutesBeforeFreeingPendingDocuments,
    publicationHandler,
  },
};
