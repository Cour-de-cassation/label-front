import { documentType } from 'src/core';

export { computeSpecificDocumentInfoEntries };

function computeSpecificDocumentInfoEntries(document: documentType) {
  return {
    decisionNumber: document.documentNumber,
    chamberName: document.decisionMetadata.chamberName || '-',
  };
}
