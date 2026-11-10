import { checklistGenerator, decisionMetadataGenerator, documentGenerator } from './generator/documentGenerator';
import { getNextStatus } from 'src/utils/document/getNextStatus';
import { getMinutesBeforeFreeingPendingDocuments } from 'src/pages/Home/DocumentSelector/getMinutesBeforeFreeingPendingDocuments';
import { publicationHandler } from 'src/utils/document/publicationHandler';

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
