import { computeGenericDocumentInfoEntries } from './computeGenericDocumentInfoEntries';
import { generateAnnotation } from 'src/test/annotationGenerator';
import { linkEntity } from 'src/utils/annotation/annotationLinkHandler';

describe('computeGenericDocumentInfoEntries', () => {
  it('should return the computed document infoentries', () => {
    const annotations = [
      { category: 'firstName', text: 'Nicolas' },
      { category: 'firstName', text: 'Nicolas' },
      { category: 'firstName', text: 'nicolas' },
      { category: 'firstName', text: 'Romain' },
      { category: 'firstName', text: 'Romain' },
      { category: 'firstName', text: 'romain' },
      { category: 'firstName', text: 'Romain' },
      { category: 'firstName', text: 'Benoit' },
      { category: 'firstName', text: 'Nicolaz' },
      { category: 'firstName', text: 'Romaun' },
    ].map(generateAnnotation);
    const text = 'That is a fake test which contains many words';
    const linkedAnnotations = linkEntity(
      annotations[0],
      annotations[8],
      linkEntity(annotations[3], annotations[9], annotations),
    );

    const documentInfoEntries = computeGenericDocumentInfoEntries(text, linkedAnnotations);

    expect(documentInfoEntries).toEqual({
      annotations: 10,
      linkedEntities: 2,
      entities: 3,
      wordCount: 9,
    });
  });
});
