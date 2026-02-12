import React, { ReactElement } from 'react';
import { apiRouteOutType } from 'src/core';
import { apiCaller, useApi } from '../../../api';
import { DataFetcher } from '../../DataFetcher';

export { ProblemReportsDataFetcher };

function ProblemReportsDataFetcher(props: {
  children: (fetched: {
    problemReportsWithDetails: apiRouteOutType<'get', 'problemReportsWithDetails'>;
    refetch: () => void;
    isLoading: boolean;
  }) => ReactElement;
}) {
  const problemReportsFetchInfo = useApi(buildFetchProblemReports(), {});

  return (
    <DataFetcher
      buildComponentWithData={(problemReportsWithDetails: apiRouteOutType<'get', 'problemReportsWithDetails'>) =>
        props.children({
          problemReportsWithDetails,
          refetch: () => problemReportsFetchInfo.refetch({}),
          isLoading: !problemReportsFetchInfo.isLoaded,
        })
      }
      fetchInfo={problemReportsFetchInfo}
      route={'problemReportsWithDetails'}
    />
  );
}

function buildFetchProblemReports() {
  return async () => {
    const { data: problemReportsWithDetails, statusCode } = await apiCaller.get<'problemReportsWithDetails'>(
      'problemReportsWithDetails',
    );
    return {
      data: problemReportsWithDetails.map((problemReportWithDetails) => ({
        ...problemReportWithDetails,
        document: problemReportWithDetails.document && {
          ...problemReportWithDetails.document,
          _id: problemReportWithDetails.document?._id,
        },
        problemReport: {
          ...problemReportWithDetails.problemReport,
        },
      })),
      statusCode,
    };
  };
}
