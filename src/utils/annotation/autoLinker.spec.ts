import { buildAnnotation } from 'src/utils/annotation/buildAnnotation';
import { buildSettings } from 'src/utils/settings/buildSettings';
import { generateAnnotation } from 'src/test/annotationGenerator';
import { autoLink } from 'src/utils/annotation/autoLinker';
import { linkEntity } from 'src/utils/annotation/annotationLinkHandler';

describe('autoLinker', () => {
  const settings = buildSettings({
    CATEGORY: {
      autoLinkSensitivity: [
        {
          kind: 'levenshteinDistance',
          threshold: 2,
        },
        { kind: 'caseInsensitive' },
        { kind: 'inclusion' },
      ],
    },
    ANOTHER_CATEGORY: {},
  });
  describe('autoLink', () => {
    it('should link the given annotations', () => {
      const annotations = [
        { category: 'CATEGORY', text: 'Dupont' },
        { category: 'CATEGORY', text: 'Dupond' },
      ].map(generateAnnotation);

      const linkedAnnotations = autoLink([annotations[0]], annotations, settings);

      expect(linkedAnnotations).toEqual(linkEntity(annotations[0], annotations[1], annotations));
    });

    it('should not link the given annotations', () => {
      const settings = buildSettings({
        CATEGORY: { autoLinkSensitivity: [{ kind: 'caseInsensitive' }] },
      });
      const annotations = [
        { category: 'CATEGORY', text: '12 rue de la grande Rue' },
        { category: 'CATEGORY', text: '11 rue de la grande Rue' },
      ].map(generateAnnotation);

      const linkedAnnotations = autoLink([annotations[0]], annotations, settings);

      expect(linkedAnnotations.sort()).toEqual([...annotations].sort());
    });
  });

  describe('autoLink with all annotations', () => {
    it('should not link annotations of different category', () => {
      const annotations = [
        { category: 'CATEGORY', text: 'annotation' },
        { category: 'ANOTHER_CATEGORY', text: 'ANNOTATION' },
      ].map(generateAnnotation);

      const linkedAnnotations = autoLink(annotations, annotations, settings);

      expect(linkedAnnotations).toEqual(annotations);
    });

    describe('case sensitivity', () => {
      it('should link the annotations of a same category with only different case', () => {
        const annotations = [
          { category: 'CATEGORY', text: 'annotation' },
          { category: 'CATEGORY', text: 'ANNOTATION' },
          { category: 'ANOTHER_CATEGORY', text: 'another_annotation' },
        ].map(generateAnnotation);

        const linkedAnnotations = autoLink(annotations, annotations, settings);

        expect(linkedAnnotations).toEqual(linkEntity(annotations[0], annotations[1], annotations));
      });
    });

    describe('do not link category if subword not included', () => {
      const settings = buildSettings({
        CATEGORY: {
          autoLinkSensitivity: [{ kind: 'caseInsensitive' }, { kind: 'levenshteinDistance', threshold: 2 }],
        },
      });
      it('should not link the unrelated annotations', () => {
        const annotations = ['Jean', 'Jean Henri', 'Jean Marie'].map((text, index) =>
          buildAnnotation({
            text,
            start: index * 10,
            category: 'CATEGORY',
            score: 1,
            source: 'agent',
          }),
        );

        const linkedAnnotations = autoLink(annotations, annotations, settings);

        expect(linkedAnnotations[0].entityId).not.toBe(linkedAnnotations[1].entityId);
        expect(linkedAnnotations[0].entityId).not.toBe(linkedAnnotations[2].entityId);
        expect(linkedAnnotations[1].entityId).not.toBe(linkedAnnotations[2].entityId);
      });
    });

    describe('subword', () => {
      it('should link the annotations of a same category which are subword of another', () => {
        const annotations = [
          { category: 'CATEGORY', text: 'longer annotation' },
          { category: 'CATEGORY', text: 'annotation' },
        ].map(generateAnnotation);

        const linkedAnnotations = autoLink(annotations, annotations, settings);

        expect(linkedAnnotations).toEqual(linkEntity(annotations[0], annotations[1], annotations));
      });
      it('should link the annotations of a same category which are subword of another (case insensitive)', () => {
        const annotations = [
          { category: 'CATEGORY', text: 'longer aNnOTaTiOn' },
          { category: 'CATEGORY', text: 'annotation' },
        ].map(generateAnnotation);

        const linkedAnnotations = autoLink(annotations, annotations, settings);

        expect(linkedAnnotations).toEqual(linkEntity(annotations[0], annotations[1], annotations));
      });
      it('should not link the annotations of a same category which are only substring of another', () => {
        const annotations = [
          { category: 'CATEGORY', text: 'longer_annotation' },
          { category: 'CATEGORY', text: 'annotation' },
        ].map(generateAnnotation);

        const linkedAnnotations = autoLink(annotations, annotations, settings);

        expect(linkedAnnotations).toEqual(annotations);
      });
    });

    describe('similar word', () => {
      it('should link the annotations of a same category with a Levenshtein distance inferior to 1 for words less long than 4', () => {
        const annotations = [
          { category: 'CATEGORY', text: 'Pont' },
          { category: 'CATEGORY', text: 'Pond' },
        ].map(generateAnnotation);

        const linkedAnnotations = autoLink(annotations, annotations, settings);

        expect(linkedAnnotations).toEqual(linkEntity(annotations[0], annotations[1], annotations));
      });
      it('should link the annotations of a same category with a Levenshtein distance inferior to 1 for words less long than 4 (case insensitive)', () => {
        const annotations = [
          { category: 'CATEGORY', text: 'Pont' },
          { category: 'CATEGORY', text: 'POND' },
        ].map(generateAnnotation);

        const linkedAnnotations = autoLink(annotations, annotations, settings);

        expect(linkedAnnotations).toEqual(linkEntity(annotations[0], annotations[1], annotations));
      });
      it('should not link the annotations of a same category with a Levenshtein distance strictly superior to 1 for words less long than 4', () => {
        const annotations = [
          { category: 'CATEGORY', text: 'Pont' },
          { category: 'CATEGORY', text: 'Pomd' },
        ].map(generateAnnotation);

        const linkedAnnotations = autoLink(annotations, annotations, settings);

        expect(linkedAnnotations).toEqual(annotations);
      });
      it('should link the annotations of a same category with a Levenshtein distance inferior to 2 for words longer than 4', () => {
        const annotations = [
          { category: 'CATEGORY', text: 'Dupont' },
          { category: 'CATEGORY', text: 'Dupond' },
        ].map(generateAnnotation);

        const linkedAnnotations = autoLink(annotations, annotations, settings);

        expect(linkedAnnotations).toEqual(linkEntity(annotations[0], annotations[1], annotations));
      });
      it('should link the annotations of a same category with a Levenshtein distance inferior to 2 for words longer than 4 (case insensitive)', () => {
        const annotations = [
          { category: 'CATEGORY', text: 'Dupont' },
          { category: 'CATEGORY', text: 'DUPOND' },
        ].map(generateAnnotation);

        const linkedAnnotations = autoLink(annotations, annotations, settings);

        expect(linkedAnnotations).toEqual(linkEntity(annotations[0], annotations[1], annotations));
      });
      it('should not link the annotations of a same category with a Levenshtein distance strictly superior to 2 for words longer than 4', () => {
        const annotations = [
          { category: 'CATEGORY', text: 'Dupont' },
          { category: 'CATEGORY', text: 'Dubomb' },
        ].map(generateAnnotation);

        const linkedAnnotations = autoLink(annotations, annotations, settings);

        expect(linkedAnnotations).toEqual(annotations);
      });
    });
  });
});
