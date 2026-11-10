import { documentType } from 'src/types/document';

export { computeSpecificDocumentInfoEntries };

function computeSpecificDocumentInfoEntries(document: documentType) {
  return {
    decisionNumber: document.documentNumber,
    chamberName: document.decisionMetadata.chamberName || '-',
  };
}
