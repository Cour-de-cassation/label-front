import { buildAnnotationsDiff } from 'src/services/annotatorState/annotationsDiff/buildAnnotationsDiff';
import { computeAnnotationsDiff } from 'src/services/annotatorState/annotationsDiff/computeAnnotationsDiff';
import { generateAnnotation } from 'src/test/annotationGenerator';
import { linkAnnotation } from 'src/utils/annotation/annotationLinker';

describe('computeAnnotationsDiff', () => {
  it('should compute the annotations diff between two set of annotations', () => {
    const annotations = [{}, {}, {}, {}, {}].map(generateAnnotation);
    const annotations1 = [annotations[0], annotations[1], annotations[2]];
    const annotations2 = [annotations[3], annotations[4], annotations[1]];

    const annotationsDiff = computeAnnotationsDiff(annotations1, annotations2);

    expect(annotationsDiff).toEqual(
      buildAnnotationsDiff([annotations[0], annotations[2]], [annotations[3], annotations[4]]),
    );
  });

  it('should compute the annotations diff between after an association', () => {
    const annotation1 = generateAnnotation();
    const annotation2 = generateAnnotation();
    const annotation1Linked = linkAnnotation(annotation1, annotation2);
    const annotations1 = [annotation1, annotation2];
    const annotations2 = [annotation1Linked, annotation2];

    const annotationsDiff = computeAnnotationsDiff(annotations1, annotations2);

    expect(annotationsDiff).toEqual(buildAnnotationsDiff([annotation1], [annotation1Linked]));
  });
});
