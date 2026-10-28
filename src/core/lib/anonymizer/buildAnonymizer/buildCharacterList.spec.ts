import { uniq } from 'lodash';
import { buildCharacterList, FORBIDDEN_CHARACTERS } from './buildCharacterList';

describe('buildCharacterList', () => {
  it('should work for 2-sized list', () => {
    const length = 2;

    const characterList = buildCharacterList(length);

    expect(characterList.length).toBe(Math.pow(26 - FORBIDDEN_CHARACTERS.length, length));
    const uniqueCharacterList = uniq(characterList);
    expect(uniqueCharacterList).toEqual(characterList);
    expect(characterList.every((characters) => /^[A-Z]+$/.test(characters))).toBeTruthy();
  });
});
