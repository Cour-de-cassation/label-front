import { computeSpecificDocumentInfoEntries } from './computeSpecificDocumentInfoEntries';
import { generateDecisionMetadata, generateDocument } from 'src/test/documentGenerator';

describe('computeSpecificDocumentInfoEntries', () => {
  it('should return all the specific infos of a document', () => {
    const decisionDate = new Date().getTime();
    const document = generateDocument({
      documentNumber: 1234567,
      decisionMetadata: generateDecisionMetadata({
        appealNumber: '',
        chamberName: 'Civile',
        date: decisionDate,
        jurisdiction: 'Cour de cassation',
        NACCode: '',
        categoriesToOmit: [],
        additionalTermsToAnnotate: '',
        occultationBlock: undefined,
      }),
    });

    const specificDocumentInfoEntries = computeSpecificDocumentInfoEntries(document);

    expect(specificDocumentInfoEntries).toEqual({
      decisionNumber: 1234567,
      chamberName: 'Civile',
    });
  });

  it('should return blank infos', () => {
    const document = generateDocument({
      documentNumber: 1234567,
    });

    const specificDocumentInfoEntries = computeSpecificDocumentInfoEntries(document);

    expect(specificDocumentInfoEntries).toEqual({
      decisionNumber: 1234567,
      chamberName: '-',
    });
  });
});
