export type documentRouteType = 'automatic' | 'exhaustive' | 'simple' | 'confirmation' | 'request' | 'default';
export type documentImporterType = 'recent' | 'manual' | 'default';
export type documentStatusType = 'done' | 'free' | 'pending' | 'locked' | 'saved' | 'toBePublished' | 'toBeConfirmed';

export type checklistEntityType = {
  text: string;
  start: number;
  category: string;
  source: string;
  score: number;
  entityId: string;
  end: number;
};

export type checklistItemType = {
  check_type: string;
  message: string;
  short_message: string;
  entities: checklistEntityType[];
  sentences: Array<{
    start: number;
    end: number;
  }>;
  metadata_text: string[];
};

export type nlpVersionType = {
  version: string;
  date: string;
};

export type nlpVersionsType = {
  juriSpacyTokenizer: nlpVersionType;
  juritools: nlpVersionType;
  pseudonymisationApi: nlpVersionType;
  model: {
    name: string;
  };
};
export type decisionMetadataType = {
  appealNumber: string;
  additionalTermsToAnnotate: string;
  computedAdditionalTerms?: {
    additionalTermsToAnnotate: string[];
    additionalTermsToUnAnnotate: string[];
  };
  additionalTermsParsingFailed?: boolean;
  boundDecisionDocumentNumbers: number[];
  categoriesToOmit: string[];
  chamberName: string;
  civilCaseCode: string;
  civilMatterCode: string;
  criminalCaseCode: string;
  date?: number;
  jurisdiction: string;
  occultationBlock?: number;
  NACCode: string;
  endCaseCode: string;
  session: string;
  solution: string;
  motivationOccultation?: boolean;
  selection?: boolean;
  sommaire?: string;
};

export type reviewStatusType = {
  viewerNames: string[];
  hasBeenAmended: boolean;
};

export type documentType = {
  _id: string;
  creationDate?: number;
  decisionMetadata: decisionMetadataType;
  documentNumber: number;
  importer: documentImporterType;
  loss?: number;
  nlpVersions?: nlpVersionsType;
  publicationCategory: string[];
  reviewStatus: reviewStatusType;
  route: documentRouteType;
  source: string;
  status: documentStatusType;
  title: string;
  text: string;
  checklist: checklistItemType[];
  externalId: string;
  priority: number;
  updateDate: number;
};

export type Zoning = {
  zones?: ZoningZones;
  introduction_subzonage?: ZoningIntroductionSubzonage;
  visa?: string[];
  is_public?: number;
  is_public_text?: string[];
  arret_id: number;
};

export type ZoningZones = {
  introduction?: { start: number; end: number };
  moyens?: { start: number; end: number } | Array<{ start: number; end: number }>;
  'expose du litige'?: { start: number; end: number } | Array<{ start: number; end: number }>;
  motivations?: { start: number; end: number } | Array<{ start: number; end: number }>;
  dispositif?: { start: number; end: number };
  'moyens annexes'?: { start: number; end: number };
};

export type ZoningIntroductionSubzonage = {
  n_arret?: string;
  formation?: string;
  publication?: string[];
  juridiction: string;
  chambre: string;
  pourvoi?: string[];
  composition?: { start: number; end: number };
};
