import { annotationGenerator } from 'src/core/modules/annotation/generator';
import { annotationLinker } from 'src/utils/annotation/annotationLinker';

describe('annotationLinker', () => {
  describe('link/unlink', () => {
    it('should be identity', () => {
      const annotationSource = annotationGenerator.generate();
      const annotationTarget = annotationGenerator.generate();

      const newAnnotationSource = annotationLinker.unlink(annotationLinker.link(annotationSource, annotationTarget));

      expect(newAnnotationSource).toEqual(annotationSource);
    });
  });
});
