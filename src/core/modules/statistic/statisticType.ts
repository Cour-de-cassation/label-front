import { ObjectId } from 'bson';
import { documentImporterType, documentRouteType, checklistItemType } from '../document/documentType';

export type statisticType = {
  _id: ObjectId;
  annotationsCount: number;
  appealNumber?: string;
  documentNumber: number;
  decisionDate?: number;
  documentExternalId: string;
  chamberName?: string;
  importer: documentImporterType;
  jurisdiction: string;
  linkedEntitiesCount: number;
  publicationCategory: string[];
  session?: string;
  endCaseCode?: string;
  NACCode?: string;
  route: documentRouteType;
  source: string;
  surAnnotationsCount: number;
  subAnnotationsSensitiveCount: number;
  subAnnotationsNonSensitiveCount: number;
  treatmentDate: number;
  treatmentsSummary: {
    userId: string;
    treatmentDuration: number;
  }[];
  wordsCount: number;
  checklist: checklistItemType[];
  comment?: string;
};
