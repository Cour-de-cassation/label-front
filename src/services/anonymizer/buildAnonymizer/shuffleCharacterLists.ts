import { shuffle } from 'src/services/anonymizer/buildAnonymizer/shuffle';

export { shuffleCharacterLists };

function shuffleCharacterLists(characterLists: string[][], seed: number) {
  let shuffledCharacterList: string[] = [];
  characterLists.forEach((characterList) => {
    shuffledCharacterList = [...shuffledCharacterList, ...shuffle(characterList, seed)];
  });
  return shuffledCharacterList;
}
