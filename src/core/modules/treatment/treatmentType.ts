import { annotationsDiffType } from '../annotationsDiff/annotationsDiffType';

type treatmentSourceType =
  | 'annotator'
  | 'admin'
  | 'NLP'
  | 'postProcess'
  | 'supplementaryAnnotations'
  | 'reimportedTreatment';

export type treatmentType = {
  _id: string;
  annotationsDiff: annotationsDiffType;
  documentId: string;
  duration: number;
  lastUpdateDate: number;
  order: number;
  surAnnotationsCount: number;
  subAnnotationsSensitiveCount: number;
  subAnnotationsNonSensitiveCount: number;
  source: treatmentSourceType;
};
