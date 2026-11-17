import { range } from 'lodash';
import { computeAnnotatorStateChecksum } from './computeAnnotatorStateChecksum';
import { buildAnnotation } from 'src/utils/annotation/buildAnnotation';
import { checklistGenerator, documentGenerator } from 'src/core/modules/document/generator/documentGenerator';
import { buildSettings } from 'src/utils/settings/buildSettings';

describe('computeAnnotatorStateChecksum', () => {
  const checklist = checklistGenerator.generate(2);
  const document = documentGenerator.generate();
  const settings = buildSettings({ prenom: {}, nom: {} });

  it('should return the same checksum every time for the same array', () => {
    const annotations = range(10).map((index) =>
      buildAnnotation({
        category: 'prenom',
        start: index * 10,
        text: 'TRUC',
        score: 1,
        source: 'agent',
      }),
    );
    const annotatorState = {
      checklist,
      document,
      settings,
      annotations: annotations,
    };

    const annotatorStateChecksum1 = computeAnnotatorStateChecksum(annotatorState);
    const annotatorStateChecksum2 = computeAnnotatorStateChecksum(annotatorState);

    expect(annotatorStateChecksum1).toEqual(annotatorStateChecksum2);
  });

  it('should return the same checksum for reversed annotations', () => {
    const checklist = checklistGenerator.generate(2);
    const annotations1 = range(10).map((index) =>
      buildAnnotation({
        category: 'prenom',
        start: index * 10,
        text: 'TRUC',
        score: 1,
        source: 'agent',
      }),
    );
    const annotations2 = [...annotations1].reverse();
    const annotatorState1 = {
      checklist,
      document,
      settings,
      annotations: annotations1,
    };
    const annotatorState2 = {
      checklist,
      document,
      settings,
      annotations: annotations2,
    };

    const annotatorStateChecksum1 = computeAnnotatorStateChecksum(annotatorState1);
    const annotatorStateChecksum2 = computeAnnotatorStateChecksum(annotatorState2);

    expect(annotatorStateChecksum1).toEqual(annotatorStateChecksum2);
  });

  it('should return a different checksum for different categories of annotations', () => {
    const checklist = checklistGenerator.generate(2);
    const annotations1 = range(10).map((index) =>
      buildAnnotation({
        category: 'prenom',
        start: index * 10,
        text: 'TRUC',
        score: 1,
        source: 'agent',
      }),
    );
    const annotations2 = [...annotations1].map((annotation, index) => ({
      ...annotation,
      category: index > 5 ? 'prenom' : 'nom',
    }));
    const annotatorState1 = {
      checklist,
      document,
      settings,
      annotations: annotations1,
    };
    const annotatorState2 = {
      checklist,
      document,
      settings,
      annotations: annotations2,
    };

    const annotatorStateChecksum1 = computeAnnotatorStateChecksum(annotatorState1);
    const annotatorStateChecksum2 = computeAnnotatorStateChecksum(annotatorState2);

    expect(annotatorStateChecksum1).not.toEqual(annotatorStateChecksum2);
  });

  it('should return a different checksum for missing annotations', () => {
    const checklist = checklistGenerator.generate(2);
    const annotations1 = range(10).map((index) =>
      buildAnnotation({
        category: 'prenom',
        start: index * 10,
        text: 'TRUC',
        score: 1,
        source: 'agent',
      }),
    );
    const annotations2 = annotations1.filter((_, index) => index >= 5);
    const annotatorState1 = {
      checklist,
      document,
      settings,
      annotations: annotations1,
    };
    const annotatorState2 = {
      checklist,
      document,
      settings,
      annotations: annotations2,
    };

    const annotatorStateChecksum1 = computeAnnotatorStateChecksum(annotatorState1);
    const annotatorStateChecksum2 = computeAnnotatorStateChecksum(annotatorState2);

    expect(annotatorStateChecksum1).not.toEqual(annotatorStateChecksum2);
  });

  it('should return the same checksum every time for the same array', () => {
    const checklist = checklistGenerator.generate(2);
    const annotations = range(10).map((index) =>
      buildAnnotation({
        category: 'prenom',
        start: index * 10,
        text: 'TRUC',
        score: 1,
        source: 'agent',
      }),
    );
    const annotatorState = {
      checklist,
      document,
      settings,
      annotations: annotations,
    };

    const annotatorStateChecksum1 = computeAnnotatorStateChecksum(annotatorState);
    const annotatorStateChecksum2 = computeAnnotatorStateChecksum(annotatorState);

    expect(annotatorStateChecksum1).toEqual(annotatorStateChecksum2);
  });
});
