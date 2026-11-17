import { generateAnnotation } from 'src/test/annotationGenerator';
import { annotationLinker } from 'src/utils/annotation/annotationLinker';

describe('annotationLinker', () => {
  describe('link/unlink', () => {
    it('should be identity', () => {
      const annotationSource = generateAnnotation();
      const annotationTarget = generateAnnotation();

      const newAnnotationSource = annotationLinker.unlink(annotationLinker.link(annotationSource, annotationTarget));

      expect(newAnnotationSource).toEqual(annotationSource);
    });
  });
});
