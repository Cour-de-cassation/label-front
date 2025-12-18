import { documentRouteType, documentImporterType } from './../document/documentType';
import { ObjectId } from 'bson';

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
