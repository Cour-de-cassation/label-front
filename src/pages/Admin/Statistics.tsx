import React from 'react';
import { Divider, Stack } from '@mui/material';
import { apiCaller, useApi } from 'src/api';
import { apiRouteOutType } from 'src/api/apiRouteType';
import { ressourceFilterType } from 'src/types/ressourceFilter';
import { ErrorState } from 'src/components/ErrorState';
import { LoadingState } from 'src/components/LoadingState';
import { StatisticsHeader } from 'src/components/Statistics/StatisticsHeader';
import { StatisticsAggregated } from 'src/components/Statistics/StatisticsAggregated';
import { StatisticsDocument } from 'src/components/Statistics/StatisticsDocument';

const INITIAL_RESSOURCE_FILTER = { route: undefined, source: undefined, userId: undefined } as ressourceFilterType;

const INITIAL_DOCUMENT_SEARCH: { documentNumber: number | undefined } = { documentNumber: undefined };

export function Statistics() {
  const availableStatisticFiltersInfo = useApi(() => apiCaller.get('availableStatisticFilters'), {});
  const workingUsersInfo = useApi(() => apiCaller.get('workingUsers'), {});
  const aggregatedStatisticsInfo = useApi(fetchAggregatedStatistics, INITIAL_RESSOURCE_FILTER);
  const documentStatisticsInfo = useApi(fetchDocumentStatistics, INITIAL_DOCUMENT_SEARCH);

  if (availableStatisticFiltersInfo.status === 'error') {
    return <ErrorState route="availableStatisticFilters" errorCode={availableStatisticFiltersInfo.statusCode} />;
  }
  if (workingUsersInfo.status === 'error') {
    return <ErrorState route="workingUsers" errorCode={workingUsersInfo.statusCode} />;
  }
  if (aggregatedStatisticsInfo.status === 'error') {
    return <ErrorState route="aggregatedStatistics" errorCode={aggregatedStatisticsInfo.statusCode} />;
  }
  if (
    availableStatisticFiltersInfo.status === 'loading' ||
    workingUsersInfo.status === 'loading' ||
    aggregatedStatisticsInfo.status === 'loading'
  ) {
    return <LoadingState />;
  }

  return (
    <Stack sx={{ flex: 1, minWidth: 0 }}>
      <StatisticsHeader
        availableStatisticFilters={availableStatisticFiltersInfo.data}
        users={workingUsersInfo.data.map(({ _id, name }) => ({ _id, name }))}
        refetch={aggregatedStatisticsInfo.refetch}
        isLoading={aggregatedStatisticsInfo.isRefetching}
        ressourceFilter={aggregatedStatisticsInfo.params}
        documentNumber={documentStatisticsInfo.params.documentNumber}
        onSearchDocumentNumber={(documentNumber) => documentStatisticsInfo.refetch({ documentNumber })}
      />
      <Stack direction="row" sx={{ flex: 1, minHeight: 0 }}>
        <StatisticsAggregated aggregatedStatistics={aggregatedStatisticsInfo.data} />
        <Divider orientation="vertical" sx={{ height: '70%', alignSelf: 'center' }} />
        <StatisticsDocument documentStatisticsInfo={documentStatisticsInfo} />
      </Stack>
    </Stack>
  );
}

async function fetchAggregatedStatistics(
  ressourceFilter: ressourceFilterType,
): Promise<{ data: apiRouteOutType<'get', 'aggregatedStatistics'> | null; statusCode: number }> {
  const hasActiveFilter = Object.values(ressourceFilter).some((value) => !!value);
  if (!hasActiveFilter) {
    return { data: null, statusCode: 200 };
  }
  return apiCaller.get('aggregatedStatistics', { ressourceFilter });
}

async function fetchDocumentStatistics({
  documentNumber,
}: {
  documentNumber: number | undefined;
}): Promise<{ data: apiRouteOutType<'get', 'documentStatistics'> | null; statusCode: number }> {
  if (documentNumber === undefined) {
    return { data: null, statusCode: 200 };
  }
  return apiCaller.get('documentStatistics', { documentNumber });
}
