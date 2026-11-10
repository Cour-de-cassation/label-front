import { checklistGenerator, decisionMetadataGenerator, documentGenerator } from './generator/documentGenerator';
import { getNextStatus, getMinutesBeforeFreeingPendingDocuments, publicationHandler } from './lib';

export { documentModule };

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
