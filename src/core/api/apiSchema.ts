import {
  treatmentType,
  statisticType,
  documentType,
  annotationType,
  problemReportType,
  userType,
  settingsType,
  replacementTermType,
  preAssignationType,
  assignationType,
  annotationsDiffType,
  fetchedDocumentType,
  documentModelCommonFieldsType,
} from '../modules';
import { problemReportTypeEnum } from '../modules/problemReport/problemReportType';
import { ressourceFilterType } from './../modules/ressourceFilter';
// import { modelType } from '../modules/modelType';
import { ObjectId } from 'bson';
import { annotationDiffDocumentInfoType } from 'src/client/pages/Admin/TreatedDocuments/AnnotationsDiffDrawer';


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
    mandatoryReplacementTerms: {
      in: {
        documentId: string;
      };
      out: replacementTermType[];
    };
    documentStatistics: {
      in: {
        documentNumber: number;
      };
      out: {
        statistics: statisticType[];
        treatmentsSummary: {
          id?: ObjectId;
          statId: ObjectId;
          treatmentDuration: number;
          name?: string;
        }[];
      };
    };

    publishableDocuments: {
      out: {
        _id: documentType["_id"],
        appealNumber: documentType["decisionMetadata"]["appealNumber"],
        chamberName: documentType["decisionMetadata"]["chamberName"],
        creationDate: documentType["creationDate"],
        documentNumber: documentType["documentNumber"],
        jurisdiction: documentType["decisionMetadata"]["jurisdiction"],
        publicationCategory: documentType["publicationCategory"],
        route: documentType["route"],
        status: documentType["status"],
      }[]
    };

    personalStatistics: {
      out: {
        day: number;
        simple: number;
        exhaustive: number;
      }[]
    };
    annotations: {
      in: {
        documentId: string;
      };
      out: annotationType[];
    };

    annotationsDiffDetails: {
      in: {
        documentId: ObjectId;
      };
      out: {
        addedAnnotations: {
          text: string;
          textStart: number;
          addedAnnotation: annotationType;
          annotationBefore?: annotationType;
          annotationAfter?: annotationType;
        }[];
        deletedAnnotations: {
          text: string;
          textStart: number;
          deletedAnnotation: annotationType;
          annotationBefore?: annotationType;
          annotationAfter?: annotationType;
        }[];
        resizedBiggerAnnotations: {
          text: string;
          textStart: number;
          addedAnnotation: annotationType;
          annotationBefore?: annotationType;
          annotationAfter?: annotationType;
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
        documentId: ObjectId;
      };
      out: string;
    };

    availableStatisticFilters: {
      out: {
        publicationCategories: string[];
        maxDate?: number;
        minDate?: number;
        routes: string[];
        importers: string[];
        sources: string[];
        jurisdictions: string[];
      };
    };

    document: {
      in: string;
      out: documentType;
    };

    problemReportsWithDetails: {
      out: {
        problemReport: problemReportType;
        user: {
          email: userType['email'],
          name: userType['name']
        }
        document: {
          _id: documentType['_id'],
          documentNumber: documentType['documentNumber']
          source: documentType['source'],
          jurisdiction: documentType['decisionMetadata']['jurisdiction'],
          appealNumber: documentType['decisionMetadata']['appealNumber'],
          publicationCategory: documentType['publicationCategory'],
          route: documentType['route'],
          status: documentType['status']
        } | undefined
      }[]
    };

    toBeConfirmedDocuments: {
      out: {
        document: {
          _id: documentType['_id'],
          documentNumber: documentType['documentNumber'],
          jurisdiction: documentType['decisionMetadata']['jurisdiction'],
          occultationBlock: documentType['decisionMetadata']['occultationBlock'],
          reviewStatus: documentType['reviewStatus'],
          publicationCategory: documentType['publicationCategory'],
          route: documentType['route'],
        },
        totalTreatmentDuration: number | undefined,
        lastTreatmentDate: number | undefined,
        userNames: string[],
      }[]
    };

    treatedDocuments: {
      out: {
        document: {
          _id: documentType['_id'],
          creationDate: documentType['creationDate'],
          documentNumber: documentType['documentNumber'],
          jurisdiction: documentType['decisionMetadata']['jurisdiction'],
          loss: documentType['loss'],
          occultationBlock: documentType['decisionMetadata']['occultationBlock'],
          reviewStatus: documentType['reviewStatus'],
          publicationCategory: documentType['publicationCategory'],
          route: documentType['route'],
          source: documentType['source']
        },
        totalTreatmentDuration: number | undefined,
        lastTreatmentDate: number | undefined,
        statistic: {
          surAnnotationsCount: number | undefined,
          subAnnotationsSensitiveCount: number | undefined,
          subAnnotationsNonSensitiveCount: number | undefined,
        },
        userNames: string[],
      }[]
    };
    untreatedDocuments: {
      out: {
        document: {
          _id: documentType['_id'],
          creationDate: documentType['creationDate'],
          decisionDate: documentType['decisionMetadata']['date'],
          documentNumber: documentType['documentNumber'],
          jurisdiction: documentType['decisionMetadata']['jurisdiction'],
          occultationBlock: documentType['decisionMetadata']['occultationBlock'],
          reviewStatus: documentType['reviewStatus'],
          publicationCategory: documentType['publicationCategory'],
          route: documentType['route'],
          source: documentType['source'],
          status: documentType['status']
        },
        userNames: string[],
      }[]
    };
    preAssignations: {
      out: {
        preAssignation: preAssignationType;
        userName: userType['name']
      }[]
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

    documentStatus: {
      in: {
        documentId: string;
      };
      out: string;
    };

    settings: {
      out: settingsType;
    };

    summary: {
      out: {
        freeDocuments: number;
        pendingDocuments: number;
        savedDocuments: number;
        doneDocuments: number;
        lockedDocuments: number;
      };
    };

    workingUsers: {
      out: userType[];
    };
  };

  post: {
    assignDocumentToUser: {
      in: {
        documentId: ObjectId;
        userId: ObjectId;
      };
      out: documentType;
    };

    deletePreAssignation: {
      in: {
        preAssignationId: ObjectId;
      };

      out: void;

    };

    deleteProblemReport: {
      in: {
        problemReportId: ObjectId;
      };
      out: void;
    };

    updateDocumentRoute: {
      in: {
        documentId: ObjectId;
        route: documentType['route']
      };

      out: documentType;
    };

    updateProblemReportHasBeenRead: {
      in: {
        problemReportId: ObjectId;
        hasBeenRead: boolean;
      };
      out: void;
    };

    deleteHumanTreatmentsForDocument: {
      in: {
        documentId: ObjectId;
      };
      out: void;
    };

    resetTreatmentLastUpdateDate: {
      in: {
        assignationId: ObjectId;
      };
      out: void;
    };

    updateTreatmentDuration: {
      in: {
        assignationId: ObjectId;
      };

      out: void;
    };

    updateTreatmentForAssignationId: {
      in: {
        annotationsDiff: annotationsDiffType;
        assignationId: ObjectId;
      };
      out: void;
    };

    problemReport: {
      in: {
        documentId: ObjectId;
        problemType: problemReportTypeEnum;
        problemText: string;
      };

      out: void;
    };

    updatePublishableDocumentStatus: {
      in: {
        documentId: ObjectId;
        status: "done" | "toBePublished";
      };
      out: documentModelCommonFieldsType;
    };
    createUser: {
      in: {
        name: string;
        email: string;
        role: string;
      };
      out: string;
    };

    deleteDocument: {
      in: {
        documentId: ObjectId;
      };
      out: void;
    };

    updateDocumentStatus: {
      in: {
        documentId: ObjectId;
        status: string;
      };
      out: documentType;
    };

    updateTreatmentForDocumentId: {
      in: {
        annotationsDiff: annotationsDiffType;
        documentId: ObjectId;
      };
      out: void;
    };

    createPreAssignation: {
      in: {
        userId: ObjectId;
        source: string;
        number: string;
      };
      out: void;
    };
  };
}




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
