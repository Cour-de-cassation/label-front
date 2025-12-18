import { replacementTermType } from './replacementTermType';
import { replacementTermGenerator } from './generator';

export { replacementTermModule };

export type { replacementTermType };

const replacementTermModule = {
  generator: replacementTermGenerator,
  lib: {},
};
