export type annotationType = {
  category: string;
  entityId: string;
  start: number;
  text: string;
  score: number;
  source: string;
};

export type annotationsDiffType = {
  before: annotationType[];
  after: annotationType[];
};
