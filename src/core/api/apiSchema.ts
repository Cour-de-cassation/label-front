import {
  statisticType,
  documentType,
  annotationType,
  problemReportType,
  userType,
  replacementTermType,
  preAssignationType,
  annotationsDiffType,
} from '../modules';
import { ressourceFilterType } from './../modules/ressourceFilter';
import { documentRouteType, documentStatusType } from '../modules/document/documentType';

export type ApiSchema = {
  get: {
    aggregatedStatistics: {
      in: {
        ressourceFilter: ressourceFilterType;
      };
      out: {
        cumulatedValue: {
          subAnnotationsSensitiveCount: number;
          subAnnotationsNonSensitiveCount: number;
          surAnnotationsCount: number;
          treatmentDuration: number;
          annotationsCount: number;
          wordsCount: number;
        };
        total: number;
      };
    };

    documentStatistics: {
      in: {
        documentNumber: number;
      };
      out: {
        statistics: statisticType;
        treatmentsSummary: {
          id?: string;
          statId: string;
          treatmentDuration: number;
          name?: string;
        }[];
      }[];
    };

    annotations: {
      in: {
        documentId: string;
      };
      out: annotationType[];
    };

    annotationsDiffDetails: {
      in: {
        documentId: string;
      };
      out: {
        addedAnnotations: {
          text: string;
          textStart: number;
          addedAnnotation: annotationType;
        }[];
        deletedAnnotations: {
          text: string;
          textStart: number;
          deletedAnnotation: annotationType;
        }[];
        resizedBiggerAnnotations: {
          text: string;
          textStart: number;
          annotationBefore: annotationType;
          annotationAfter: annotationType;
        }[];
        resizedSmallerAnnotations: {
          text: string;
          textStart: number;
          annotationBefore: annotationType;
          annotationAfter: annotationType;
        }[];
        categoryChangedAnnotations: {
          text: string;
          textStart: number;
          annotationBefore: annotationType;
          annotationAfter: annotationType;
        }[];
      };
    };

    anonymizedDocumentText: {
      in: {
        documentId: string;
      };
      out: string;
    };

    availableStatisticFilters: {
      out: {
        publicationCategories: string[];
        maxDate?: number;
        minDate?: number;
        routes: string[]; // todo after
        importers: string[];
        sources: string[];
        jurisdictions: string[];
      };
    };

    document: {
      in: {
        documentId: string;
      };
      out: documentType;
    };

    documentsForUser: {
      in: {
        documentsMaxCount: number;
      };
      out: {
        document: documentType;
        assignationId: string;
      }[];
    };

    health: {
      out: boolean;
    };

    problemReportsWithDetails: {
      out: {
        problemReport: problemReportType;
        user: {
          email: userType['email'];
          name: userType['name'];
        };
        document?: {
          _id: documentType['_id'];
          documentNumber: documentType['documentNumber'];
          source: documentType['source'];
          jurisdiction: documentType['decisionMetadata']['jurisdiction'];
          appealNumber: documentType['decisionMetadata']['appealNumber'];
          publicationCategory: documentType['publicationCategory'];
          route: documentRouteType;
          status: documentStatusType;
        };
      }[];
    };

    documentStatus: {
      in: {
        documentId: string;
      };
      out: documentStatusType;
    };

    settings: {
      out: {
        json: string;
      };
    };

    summary: {
      in: Record<string, never>;
      out: {
        freeDocuments: number;
        pendingDocuments: number;
        savedDocuments: number;
        doneDocuments: number;
        lockedDocuments: number;
      };
    };

    publishableDocuments: {
      out: {
        _id: documentType['_id'];
        appealNumber: documentType['decisionMetadata']['appealNumber'];
        chamberName: documentType['decisionMetadata']['chamberName'];
        creationDate: documentType['creationDate'];
        documentNumber: documentType['documentNumber'];
        jurisdiction: documentType['decisionMetadata']['jurisdiction'];
        publicationCategory: documentType['publicationCategory'];
        route: documentRouteType;
        status: documentStatusType;
      }[];
    };

    toBeConfirmedDocuments: {
      out: {
        document: {
          _id: documentType['_id'];
          documentNumber: documentType['documentNumber'];
          jurisdiction: documentType['decisionMetadata']['jurisdiction'];
          occultationBlock: documentType['decisionMetadata']['occultationBlock'];
          reviewStatus: documentType['reviewStatus'];
          publicationCategory: documentType['publicationCategory'];
          route: documentRouteType;
        };
        totalTreatmentDuration: number | undefined;
        lastTreatmentDate: number | undefined;
        userNames: string[];
      }[];
    };

    treatedDocuments: {
      out: {
        document: {
          _id: documentType['_id'];
          creationDate: documentType['creationDate'];
          documentNumber: documentType['documentNumber'];
          jurisdiction: documentType['decisionMetadata']['jurisdiction'];
          loss: documentType['loss'];
          occultationBlock: documentType['decisionMetadata']['occultationBlock'];
          reviewStatus: documentType['reviewStatus'];
          publicationCategory: documentType['publicationCategory'];
          route: documentRouteType;
          source: documentType['source'];
        };
        totalTreatmentDuration: number | undefined;
        lastTreatmentDate: number | undefined;
        statistic: {
          surAnnotationsCount: number | undefined;
          subAnnotationsSensitiveCount: number | undefined;
          subAnnotationsNonSensitiveCount: number | undefined;
        };
        userNames: string[];
      }[];
    };

    personalStatistics: {
      out: {
        day: number;
        simple: number;
        exhaustive: number;
      }[];
    };

    untreatedDocuments: {
      out: {
        document: {
          _id: documentType['_id'];
          creationDate: documentType['creationDate'];
          decisionDate: documentType['decisionMetadata']['date'];
          documentNumber: documentType['documentNumber'];
          jurisdiction: documentType['decisionMetadata']['jurisdiction'];
          occultationBlock: documentType['decisionMetadata']['occultationBlock'];
          reviewStatus: documentType['reviewStatus'];
          publicationCategory: documentType['publicationCategory'];
          route: documentRouteType;
          source: documentType['source'];
          status: documentStatusType;
        };
        userNames: string[];
      }[];
    };

    mandatoryReplacementTerms: {
      in: {
        documentId: string;
      };
      out: replacementTermType[];
    };

    workingUsers: {
      out: userType[];
    };

    preAssignations: {
      out: {
        preAssignation: preAssignationType;
        userName: userType['name'];
      }[];
    };
  };

  post: {
    assignDocumentToUser: {
      in: {
        documentId: string;
        userId: string;
      };
      out: documentType;
    };

    createUser: {
      in: {
        name: string;
        email: string;
        role: string;
      };
      out: string;
    };

    deleteProblemReport: {
      in: {
        problemReportId: string;
      };
      out: void;
    };

    deletePreAssignation: {
      in: {
        preAssignationId: string;
      };

      out: void;
    };

    deleteHumanTreatmentsForDocument: {
      in: {
        documentId: string;
      };
      out: void;
    };

    deleteDocument: {
      in: {
        documentId: string;
      };
      out: void;
    };

    problemReport: {
      in: {
        documentId: string;
        problemType: 'bug' | 'annotationProblem' | 'suggestion';
        problemText: string;
      };

      out: void;
    };

    resetTreatmentLastUpdateDate: {
      in: {
        assignationId: string;
      };
      out: void;
    };

    updateAssignationDocumentStatus: {
      in: {
        assignationId: string;
        status: documentStatusType;
      };
      out: documentType;
    };

    updateDocumentStatus: {
      in: {
        documentId: string;
        status: string;
      };
      out: documentType;
    };

    updateDocumentRoute: {
      in: {
        documentId: string;
        route: documentRouteType;
      };

      out: documentType;
    };

    updatePublishableDocumentStatus: {
      in: {
        documentId: string;
        status: 'done' | 'toBePublished';
      };
      out: documentType;
    };

    updateProblemReportHasBeenRead: {
      in: {
        problemReportId: string;
        hasBeenRead: boolean;
      };
      out: void;
    };

    updateTreatmentDuration: {
      in: {
        assignationId: string;
      };

      out: void;
    };

    updateTreatmentForAssignationId: {
      in: {
        annotationsDiff: annotationsDiffType;
        assignationId: string;
      };
      out: void;
    };

    updateTreatmentForDocumentId: {
      in: {
        annotationsDiff: annotationsDiffType;
        documentId: string;
      };
      out: void;
    };

    createPreAssignation: {
      in: {
        userId: string;
        source: string;
        number: string;
      };
      out: void;
    };
  };
};

export type apiSchemaType = {
  get: ApiSchema['get'];
  post: ApiSchema['post'];
};

export type apiSchemaMethodNameType = keyof apiSchemaType;

export type apiSchemaMethodType = { [key: string]: apiSchemaEntryType };

export type apiSchemaEntryType = {
  in?: ApiSchema[keyof ApiSchema][keyof ApiSchema[keyof ApiSchema]]['in'];
  out: ApiSchema[keyof ApiSchema][keyof ApiSchema[keyof ApiSchema]]['out'];
};
