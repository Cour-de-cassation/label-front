import { generateAnnotation } from 'src/test/annotationGenerator';
import { comparator } from 'src/utils/annotation/comparator';

describe('comparator', () => {
  describe('equal', () => {
    it('should return true for equal annotations', () => {
      const annotation = generateAnnotation();

      const result = comparator.equal(annotation, annotation);

      expect(result).toEqual(true);
    });

    it('should return false otherwise', () => {
      const annotation1 = generateAnnotation({ text: 'TEXT1' });
      const annotation2 = generateAnnotation({ text: 'TEXT1' });

      const result = comparator.equal(annotation1, annotation2);

      expect(result).toEqual(false);
    });
  });
});
