import { annotationType } from 'src/types/annotation';

export type specifierType = '%c' | '%d';

export type formatSpecifierType = {
  index: number;
  specifier: specifierType;
};

export type specifierGeneratorType = {
  '%c': { generate: (annotation: annotationType) => string };
  '%d': { generate: () => string };
};
