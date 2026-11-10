export type problemReportType = {
  _id: string;
  documentId: string;
  userId: string;
  date: number;
  text: string;
  hasBeenRead: boolean;
  type: 'bug' | 'annotationProblem' | 'suggestion';
};
