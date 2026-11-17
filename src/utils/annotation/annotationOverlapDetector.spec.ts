import { annotationGenerator } from 'src/core/modules/annotation/generator/annotationGenerator';
import { isAnnotationTextOverlappedWithAnyAnnotations } from 'src/utils/annotation/annotationOverlapDetector';

describe('annotationOverlapDetector', () => {
  describe('isAnnotationTextOverlappedWithAnyAnnotations', () => {
    it('should return true if the annotation is overlapped', () => {
      const annotations = [{ text: 'MACHIN', start: 10 }].map(annotationGenerator.generate);
      const annotationStart = 13;
      const annotationText = 'TRUC';

      expect(isAnnotationTextOverlappedWithAnyAnnotations(annotations, annotationStart, annotationText)).toBeTruthy();
    });

    it('should return false if the annotation is not overlapped', () => {
      const annotations = [
        { text: 'MACHIN', start: 10 },
        { text: 'CHOSE', start: 30 },
      ].map(annotationGenerator.generate);
      const annotationStart = 20;
      const annotationText = 'TRUC';

      expect(isAnnotationTextOverlappedWithAnyAnnotations(annotations, annotationStart, annotationText)).toBeFalsy();
    });
  });
});
