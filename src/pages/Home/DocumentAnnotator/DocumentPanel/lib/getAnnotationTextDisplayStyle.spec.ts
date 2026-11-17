import { getAnnotationTextDisplayStyle } from './getAnnotationTextDisplayStyle';
import { buildSettings } from 'src/utils/settings/buildSettings';
import { annotationGenerator } from 'src/core/modules/annotation/generator/annotationGenerator';

describe('getAnnotationTextDisplayStyle', () => {
  const settings = buildSettings({
    prenom: { order: 1, text: 'Prénom', status: 'hidden' },
    nom: { order: 2, text: 'Nom', status: 'alwaysVisible' },
    adresse: { order: 3, text: 'Adresse', status: 'annotable' },
  });

  it('should return none', () => {
    const annotation = annotationGenerator.generate({
      category: 'prenom',
    });
    const documentViewerMode = {
      kind: 'annotation' as const,
      isAnonymizedView: true,
    };
    const displayStyle = getAnnotationTextDisplayStyle({
      settings,
      annotation,
      documentViewerMode,
    });

    expect(displayStyle).toBe('none');
  });

  it('should return underlined', () => {
    const annotation = annotationGenerator.generate({ category: 'nom' });
    const documentViewerMode = {
      kind: 'annotation' as const,
      isAnonymizedView: true,
    };
    const displayStyle = getAnnotationTextDisplayStyle({
      settings,
      annotation,
      documentViewerMode,
    });

    expect(displayStyle).toBe('underlined');
  });

  it('should return outlined', () => {
    const annotation = annotationGenerator.generate({
      category: 'adresse',
    });
    const documentViewerMode = {
      kind: 'occurrence' as const,
      category: annotation.category,
      entityId: 'OTHER_ENTITY_ID',
      isAnonymizedView: true,
      entityLineNumbers: [],
    };
    const displayStyle = getAnnotationTextDisplayStyle({
      settings,
      annotation,
      documentViewerMode,
    });

    expect(displayStyle).toBe('outlined');
  });

  it('should return filled', () => {
    const annotation = annotationGenerator.generate({
      category: 'adresse',
    });
    const documentViewerMode = {
      kind: 'occurrence' as const,
      category: annotation.category,
      entityId: annotation.entityId,
      isAnonymizedView: true,
      entityLineNumbers: [],
    };
    const displayStyle = getAnnotationTextDisplayStyle({
      settings,
      annotation,
      documentViewerMode,
    });

    expect(displayStyle).toBe('filled');
  });
});
