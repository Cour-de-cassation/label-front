import { documentRouteType, documentImporterType } from 'src/types/document';

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
  userId?: string;
};
