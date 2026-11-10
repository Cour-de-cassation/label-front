import { annotationGenerator } from 'src/core/modules/annotation/generator';
import { comparator } from 'src/utils/annotation/comparator';

describe('comparator', () => {
  describe('equal', () => {
    it('should return true for equal annotations', () => {
      const annotation = annotationGenerator.generate();

      const result = comparator.equal(annotation, annotation);

      expect(result).toEqual(true);
    });

    it('should return false otherwise', () => {
      const annotation1 = annotationGenerator.generate({ text: 'TEXT1' });
      const annotation2 = annotationGenerator.generate({ text: 'TEXT1' });

      const result = comparator.equal(annotation1, annotation2);

      expect(result).toEqual(false);
    });
  });
});
