import { applyToAnnotations } from 'src/services/annotatorState/annotationsDiff/applyToAnnotations';
import { sortAnnotations } from 'src/utils/annotation/sortAnnotations';
import { generateAnnotation } from 'src/test/annotationGenerator';

describe('applyToAnnotations', () => {
  it('should compute the annotations after the application of the diff', () => {
    const annotations = [{}, {}, {}, {}].map(generateAnnotation);
    const newAnnotation = generateAnnotation();
    const annotationsDiff = {
      before: [annotations[0], annotations[3]],
      after: [newAnnotation],
    };

    const newAnnotations = applyToAnnotations(annotations, annotationsDiff);

    expect(newAnnotations).toEqual(sortAnnotations([annotations[1], annotations[2], newAnnotation]));
  });
});
