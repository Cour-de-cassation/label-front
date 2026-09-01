export type documentRouteType = 'automatic' | 'exhaustive' | 'simple' | 'confirmation' | 'request' | 'default';
export type documentImporterType = 'recent' | 'manual' | 'default';
export type documentStatusType = 'done' | 'free' | 'pending' | 'locked' | 'saved' | 'toBeConfirmed';

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

export type decisionMetadataType = {
  appealNumber: string;
  additionalTermsToAnnotate: string;
  computedAdditionalTerms?: {
    additionalTermsToAnnotate: string[];
    additionalTermsToUnAnnotate: string[];
  };
  additionalTermsParsingFailed?: boolean;
  categoriesToOmit: string[];
  chamberName: string;
  date?: number;
  jurisdiction: string;
  occultationBlock?: number;
  NACCode: string;
  motivationOccultation?: boolean;
  selection?: boolean;
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
  publicationCategory: string[];
  reviewStatus: reviewStatusType;
  route: documentRouteType;
  source: string;
  status: documentStatusType;
  title: string;
  text: string;
  checklist: checklistItemType[];
  externalId: string;
  updateDate: number;
};
