import { generateAnnotation } from 'src/test/annotationGenerator';
import { linkAnnotation, unlinkAnnotation } from 'src/utils/annotation/annotationLinker';

describe('annotationLinker', () => {
  describe('link/unlink', () => {
    it('should be identity', () => {
      const annotationSource = generateAnnotation();
      const annotationTarget = generateAnnotation();

      const newAnnotationSource = unlinkAnnotation(linkAnnotation(annotationSource, annotationTarget));

      expect(newAnnotationSource).toEqual(annotationSource);
    });
  });
});
