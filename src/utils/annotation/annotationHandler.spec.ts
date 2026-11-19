import { sortAnnotations } from 'src/utils/annotation/sortAnnotations';
import { buildSettings } from 'src/utils/settings/buildSettings';
import { generateAnnotation } from 'src/test/annotationGenerator';
import {
  createAnnotation,
  createLinkedAnnotations,
  createAnnotations,
  deleteAnnotationsByTextAndCategory,
  deleteAnnotationByTextAndStart,
  getAnnotationIndex,
  updateEntityCategory,
} from 'src/utils/annotation/annotationHandler';
import { isAnnotationLinkedTo } from 'src/utils/annotation/annotationLinkHandler';
import { linkAnnotation } from 'src/utils/annotation/annotationLinker';
import { computeEntityId } from 'src/utils/annotation/entityIdHandler';

describe('annotationHandler', () => {
  const settings = buildSettings({
    CATEGORY: {},
    ANOTHER_CATEGORY: {},
    CATEGORY2: {},
    CATEGORY1: {},
  });

  describe('createAll', () => {
    it('should create all the annotations for the given texts and indices', () => {
      const category = 'CATEGORY';
      const annotationText = 'engineer';
      const annotationTextsAndIndices = [
        { index: 34, text: annotationText },
        { index: 66, text: annotationText },
      ];
      const annotations = [{}].map(generateFetchedAnnotation);

      const newAnnotations = createAnnotations(annotations, category, annotationTextsAndIndices, settings);

      expect(newAnnotations).toEqual([
        {
          category,
          start: 34,
          score: 1,
          entityId: computeEntityId(category, annotationText),
          text: annotationText,
          source: 'agent',
        },
        {
          category,
          score: 1,
          start: 66,
          entityId: computeEntityId(category, annotationText),
          text: annotationText,
          source: 'agent',
        },
        ...annotations,
      ]);
    });
  });

  describe('createManyLinked', () => {
    it('should create 3 annotations and link them together', () => {
      const category = 'CATEGORY';
      const annotationFieldsToCreate = [
        { category, start: 0, text: 'TextA' },
        { category, start: 10, text: 'TextB' },
        { category, start: 20, text: 'TextC' },
      ];
      const newAnnotations = createLinkedAnnotations([], annotationFieldsToCreate);

      expect(newAnnotations.length).toEqual(3);
      expect(isAnnotationLinkedTo(newAnnotations[0], newAnnotations[1])).toBeTruthy();
      expect(isAnnotationLinkedTo(newAnnotations[0], newAnnotations[2])).toBeTruthy();
    });
  });

  describe('deleteByTextAndCategory', () => {
    it('should delete an annotation according to its text and category', () => {
      const annotation1 = generateAnnotation({
        category: 'CATEGORY',
        text: 'FIRST_TEXT',
      });
      const annotation2 = generateAnnotation({
        category: 'CATEGORY',
        text: 'SECOND_TEXT',
      });
      const annotation3 = generateAnnotation({
        category: 'CATEGORY',
        text: 'THIRD_TEXT',
      });

      const annotations = [annotation1, annotation2, annotation3];

      const newAnnotations = deleteAnnotationsByTextAndCategory(annotations, annotation1);

      expect(newAnnotations).toEqual([annotation2, annotation3]);
    });

    it('should not conserve a link of a deleted annotation', () => {
      const annotation1 = generateAnnotation({
        category: 'CATEGORY',
        text: 'FIRST_TEXT',
      });
      const annotation2 = generateAnnotation({
        category: 'CATEGORY',
        text: 'SECOND_TEXT',
      });
      const annotation1Linked = linkAnnotation(annotation1, annotation2);
      const annotations = [annotation1Linked, annotation2];

      const newAnnotations = createAnnotation(
        deleteAnnotationsByTextAndCategory(annotations, annotation2),
        annotation2,
        settings,
      );

      expect(sortAnnotations(newAnnotations)).toEqual(sortAnnotations([annotation1, annotation2]));
    });

    it('should conserve a link even when the naming entity is deleted', () => {
      const annotation1 = generateAnnotation({
        category: 'CATEGORY',
        text: 'FIRST_TEXT',
      });
      const annotation2 = generateAnnotation({
        category: 'CATEGORY',
        text: 'SECOND_TEXT',
      });
      const annotation3 = generateAnnotation({
        category: 'CATEGORY',
        text: 'THIRD_TEXT',
      });
      const annotation1Linked = linkAnnotation(annotation1, annotation3);
      const annotation2Linked = linkAnnotation(annotation2, annotation3);
      const annotations = [annotation1Linked, annotation2Linked, annotation3];

      const newAnnotations = deleteAnnotationsByTextAndCategory(annotations, annotation3);

      expect(newAnnotations.length).toBe(2);
      expect(isAnnotationLinkedTo(newAnnotations[0], newAnnotations[1])).toBeTruthy();
    });
  });

  describe('deleteByTextAndStart', () => {
    it('should delete an annotation according to its text and start position', () => {
      const annotation1 = generateAnnotation({
        category: 'CATEGORY',
        text: 'FIRST_TEXT',
      });
      const annotation2 = generateAnnotation({
        category: 'CATEGORY',
        text: 'SECOND_TEXT',
      });
      const annotations = [annotation1, annotation2];

      const newAnnotations = deleteAnnotationByTextAndStart(annotations, annotation2);

      expect(newAnnotations).toEqual([annotation1]);
    });

    it('should not conserve a link of a deleted annotation', () => {
      const annotation1 = generateAnnotation({
        category: 'CATEGORY',
        text: 'FIRST_TEXT',
      });
      const annotation2 = generateAnnotation({
        category: 'CATEGORY',
        text: 'SECOND_TEXT',
      });
      const annotation1Linked = linkAnnotation(annotation1, annotation2);
      const annotations = [annotation1Linked, annotation2];

      const newAnnotations = createAnnotation(
        deleteAnnotationByTextAndStart(annotations, annotation2),
        annotation2,
        settings,
      );

      expect(sortAnnotations(newAnnotations)).toEqual(sortAnnotations([annotation1, annotation2]));
    });
  });

  describe('updateManyCategory', () => {
    it('should update the category of all the given annotations of the given entityId', () => {
      const newCategory = 'ANOTHER_CATEGORY';
      const text = 'TEXT';
      const annotations = [
        { category: 'CATEGORY1', text },
        { category: 'CATEGORY2' },
        { category: 'CATEGORY1', text },
      ].map(generateFetchedAnnotation);

      const updatedAnnotations = updateEntityCategory(annotations, annotations[0].entityId, newCategory, settings);

      expect(updatedAnnotations.map((annotation) => annotation.category)).toEqual([
        newCategory,
        'CATEGORY2',
        newCategory,
      ]);
    });
  });

  describe('getAnnotationIndex', () => {
    it('should return the index and the total of the annotation of a same entity', () => {
      const annotations = [
        { category: 'CATEGORY', start: 4, text: 'TEXT' },
        { category: 'CATEGORY', start: 17, text: 'TEXT' },
        { category: 'ANOTHER_CATEGORY', start: 8, text: 'ANOTHER_TEXT' },
        { category: 'CATEGORY', start: 1, text: 'TEXT' },
        { category: 'ANOTHER_CATEGORY', start: 23, text: 'ANOTHER_TEXT' },
      ].map(generateFetchedAnnotation);

      const annotationIndex = getAnnotationIndex(annotations, annotations[0]);

      expect(annotationIndex).toEqual({ index: 2, total: 3 });
    });
  });
});

function generateFetchedAnnotation(fields: { start?: number; category?: string; text?: string; source?: string }) {
  return generateAnnotation(fields);
}
