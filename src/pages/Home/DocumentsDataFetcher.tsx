import React, { ReactElement } from 'react';
import { annotationType, assignationType, documentType } from 'src/core';
import { apiCaller, useApi } from '../../api';
import { DataFetcher } from '../DataFetcher';

export { DocumentsDataFetcher };

function DocumentsDataFetcher(props: {
  children: (fetched: {
    documentsForUser: {
      assignationId: assignationType['_id'];
      document: documentType;
      annotations: annotationType[];
    }[];
    fetchNewDocumentsForUser: () => void;
  }) => ReactElement;
  documentsMaxCount: number;
}) {
  const documentsForUserFetchInfo = useApi(buildFetchDocumentsForUser(), {
    documentsMaxCount: props.documentsMaxCount,
  });

  return (
    <DataFetcher
      buildComponentWithData={(
        documentsForUser: {
          assignationId: assignationType['_id'];
          document: documentType;
          annotations: annotationType[];
        }[],
      ) => props.children({ documentsForUser, fetchNewDocumentsForUser: () => documentsForUserFetchInfo.refetch() })}
      fetchInfo={documentsForUserFetchInfo}
      showLoadingOnRefetch
      route={'documentsForUser'}
    />
  );
}

function buildFetchDocumentsForUser() {
  return async ({ documentsMaxCount }: { documentsMaxCount: number }) => {
    const { documentsForUser, statusCode } = await fetchDocumentsForUser(documentsMaxCount);

    return { data: documentsForUser, statusCode };
  };
}

async function fetchDocumentsForUser(documentsMaxCount: number) {
  const documentsForUser: Array<{
    document: documentType;
    assignationId: assignationType['_id'];
    annotations: annotationType[];
  }> = [];
  const statusCodesAnnotations = [];

  const { data: assignatedDocuments, statusCode: statusCodeDocuments } = await apiCaller.get<'documentsForUser'>(
    'documentsForUser',
    {
      documentsMaxCount,
    },
  );

  for (let i = 0; i < assignatedDocuments.length; i++) {
    const assignatedDocument = assignatedDocuments[i];

    try {
      const { data: annotations, statusCode: statusCodeAnnotations } = await apiCaller.get<'annotations'>(
        'annotations',
        {
          documentId: assignatedDocument.document._id,
        },
      );

      documentsForUser.push({
        document: {
          ...assignatedDocument.document,
          _id: assignatedDocument.document._id,
        },
        assignationId: assignatedDocument.assignationId,
        annotations,
      });
      statusCodesAnnotations.push(statusCodeAnnotations);
    } catch (error) {
      console.warn(error);
    }
  }

  return {
    documentsForUser,
    statusCode: Math.max(statusCodeDocuments, ...statusCodesAnnotations),
  };
}
