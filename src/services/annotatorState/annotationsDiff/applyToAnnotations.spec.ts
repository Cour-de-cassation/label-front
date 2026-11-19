import { annotationModule } from 'src/core/modules/annotation';
import { annotationsDiffGenerator } from 'src/core/modules/annotationsDiff/generator';
import { applyToAnnotations } from 'src/services/annotatorState/annotationsDiff/applyToAnnotations';

describe('applyToAnnotations', () => {
  it('should compute the annotations after the application of the diff', () => {
    const annotations = [{}, {}, {}, {}].map(annotationModule.generator.generate);
    const newAnnotation = annotationModule.generator.generate();
    const annotationsDiff = annotationsDiffGenerator.generate({
      before: [annotations[0], annotations[3]],
      after: [newAnnotation],
    });

    const newAnnotations = applyToAnnotations(annotations, annotationsDiff);

    expect(newAnnotations).toEqual(
      annotationModule.lib.sortAnnotations([annotations[1], annotations[2], newAnnotation]),
    );
  });
});
