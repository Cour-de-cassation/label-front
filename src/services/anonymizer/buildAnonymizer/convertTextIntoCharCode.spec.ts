import { convertTextIntoCharCode } from 'src/services/anonymizer/buildAnonymizer/convertTextIntoCharCode';

describe('convertTextIntoCharCode', () => {
  it('should return 16185141513', () => {
    const text = 'prenom';

    const charCode = convertTextIntoCharCode(text);

    expect(charCode).toEqual(16185141513);
  });
});
