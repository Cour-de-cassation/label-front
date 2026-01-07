import { ObjectId } from 'bson';
import { documentRouteType, documentImporterType } from './../document/documentType';

export type ressourceFilterType = {
  mustHaveSurAnnotations: boolean;
  mustHaveSubAnnotations: boolean;
  publicationCategory?: string;
  startDate?: number;
  endDate?: number;
  route?: documentRouteType;
  importer?: documentImporterType;
  source?: string;
  jurisdiction?: string;
  userId?: ObjectId;
};
