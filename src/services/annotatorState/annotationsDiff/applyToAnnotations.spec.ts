import { annotationsDiffGenerator } from 'src/core/modules/annotationsDiff/generator/annotationsDiffGenerator';
import { applyToAnnotations } from 'src/services/annotatorState/annotationsDiff/applyToAnnotations';
import { sortAnnotations } from 'src/utils/annotation/sortAnnotations';
import { annotationGenerator } from 'src/core/modules/annotation/generator/annotationGenerator';

describe('applyToAnnotations', () => {
  it('should compute the annotations after the application of the diff', () => {
    const annotations = [{}, {}, {}, {}].map(annotationGenerator.generate);
    const newAnnotation = annotationGenerator.generate();
    const annotationsDiff = annotationsDiffGenerator.generate({
      before: [annotations[0], annotations[3]],
      after: [newAnnotation],
    });

    const newAnnotations = applyToAnnotations(annotations, annotationsDiff);

    expect(newAnnotations).toEqual(sortAnnotations([annotations[1], annotations[2], newAnnotation]));
  });
});
