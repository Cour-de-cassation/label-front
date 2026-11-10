import { countBy } from 'lodash';
import { annotationType } from 'src/types/annotation';
import { buildAvailableCharacters } from 'src/services/anonymizer/buildAnonymizer/buildAvailableCharacters';
import { FORBIDDEN_CHARACTERS } from 'src/services/anonymizer/buildAnonymizer/buildCharacterList';
import { convertTextIntoCharCode } from 'src/services/anonymizer/buildAnonymizer/convertTextIntoCharCode';
import { shuffleCharacterLists } from 'src/services/anonymizer/buildAnonymizer/shuffleCharacterLists';

export { buildAvailableCharactersMapper };

const DEFAULT_MAX_DISTINCT_REPLACEMENT_CHARACTERS = 26 - FORBIDDEN_CHARACTERS.length;

function buildAvailableCharactersMapper(annotations: annotationType[], seed: number) {
  const entityIdsByCategoryCount = countBy(annotations, 'category');
  return Object.keys(entityIdsByCategoryCount).reduce(
    (accumulator, category) => {
      const entityIdsCount = entityIdsByCategoryCount[category];
      const availableCharacters = buildAvailableCharacters(
        Math.max(entityIdsCount, DEFAULT_MAX_DISTINCT_REPLACEMENT_CHARACTERS),
      );
      const compoundSeed = seed * convertTextIntoCharCode(category);
      return {
        ...accumulator,
        [category]: shuffleCharacterLists(availableCharacters, compoundSeed),
      };
    },
    {} as Record<string, string[]>,
  );
}
