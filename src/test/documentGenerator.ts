import { documentType } from 'src/types/document';

export function generateChecklist(size: number): documentType['checklist'] {
  return Array.from({ length: size }, () => ({
    check_type: `CHECK_TYPE_${Math.random()}`,
    message: "Default message: L'annotation 'Test' est présente dans différentes catégories.",
    short_message: 'Default short message: Annotation dans plusieurs catégories ?',
    entities: [
      {
        text: 'DefaultEntity',
        start: Math.floor(Math.random() * 100),
        end: Math.floor(Math.random() * 100 + 100),
        category: `defaultCategory_${Math.random()}`,
        source: 'test',
        score: Math.random(),
        entityId: `defaultEntity_${Math.random()}`,
      },
    ],
    sentences: [
      {
        start: Math.floor(Math.random() * 100),
        end: Math.floor(Math.random() * 100 + 100),
      },
    ],
    metadata_text: [`metadata_${Math.random()}`, `_metadata_${Math.random()}`],
  }));
}

export function generateDecisionMetadata({
  additionalTermsToAnnotate,
  additionalTermsParsingFailed,
  computedAdditionalTerms,
  appealNumber,
  categoriesToOmit,
  chamberName,
  date,
  jurisdiction,
  NACCode,
  occultationBlock,
  motivationOccultation,
  raisonInteretParticulier,
}: Partial<documentType['decisionMetadata']> = {}): documentType['decisionMetadata'] {
  return {
    additionalTermsToAnnotate: additionalTermsToAnnotate ?? '',
    computedAdditionalTerms: computedAdditionalTerms ?? undefined,
    additionalTermsParsingFailed: additionalTermsParsingFailed ?? undefined,
    appealNumber: appealNumber ?? '',
    categoriesToOmit: categoriesToOmit ?? [],
    chamberName: chamberName ?? '',
    date: date ?? new Date().getTime(),
    jurisdiction: jurisdiction ?? '',
    NACCode: NACCode ?? '',
    occultationBlock: occultationBlock ?? 0,
    motivationOccultation: motivationOccultation ?? undefined,
    raisonInteretParticulier: raisonInteretParticulier ?? false,
  };
}

export function generateDocument({
  creationDate,
  decisionMetadata,
  documentNumber,
  externalId,
  _id,
  importer,
  publicationCategory,
  reviewStatus,
  route,
  source,
  status,
  title,
  text,
  updateDate,

  checklist,
}: Partial<documentType> = {}): documentType {
  return {
    creationDate: creationDate ? creationDate : new Date().getTime(),
    decisionMetadata: decisionMetadata ? decisionMetadata : generateDecisionMetadata(),
    documentNumber: documentNumber ?? Math.floor(Math.random() * 1000000),
    externalId: externalId ?? `EXTERNAL_ID_${Math.random()}`,
    _id: _id ? _id : 'monId123',
    importer: importer ?? 'default',
    publicationCategory: publicationCategory ? publicationCategory : [],
    reviewStatus: reviewStatus || { hasBeenAmended: false, viewerNames: [] },
    route: route || 'default',
    source: source ?? `SOURCE_${Math.random()}`,
    status: status ?? 'free',
    title: title ?? `TITLE_${Math.random()}`,
    text: text ?? `TEXT_${Math.random()}`,
    updateDate: updateDate ?? new Date().getTime(),
    checklist: checklist ?? generateChecklist(Math.floor(Math.random() * (10 - 0 + 1) + 0)),
  };
}
