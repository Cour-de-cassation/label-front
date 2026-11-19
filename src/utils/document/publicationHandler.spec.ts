import { mustBePublished } from 'src/utils/document/publicationHandler';

describe('publicationHandler', () => {
  it('should mustBePublished return true because of publicationCategory', () => {
    const publicationCategory = ['P', 'B'];
    const NACCode = '99A';

    const isPublishable = mustBePublished(publicationCategory, NACCode);

    expect(isPublishable).toEqual(true);
  });

  it('should mustBePublished return true because of NACCode', () => {
    const publicationCategory = ['W'];
    const NACCode = '97H';

    const isPublishable = mustBePublished(publicationCategory, NACCode);

    expect(isPublishable).toEqual(true);
  });

  it('should mustBePublished return false', () => {
    const publicationCategory = ['W'];
    const NACCode = '99A';

    const isPublishable = mustBePublished(publicationCategory, NACCode);

    expect(isPublishable).toEqual(false);
  });
});
