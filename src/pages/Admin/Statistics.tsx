import React from 'react';
import { apiCaller, useApi } from 'src/api';
import { apiRouteOutType } from 'src/api/apiRouteType';
import { ressourceFilterType } from 'src/types/ressourceFilter';
import { customThemeType, Text, useCustomTheme } from 'src/pelta-design-system';
import { heights, widths } from 'src/theme/layout';
import { wordings } from 'src/wordings';
import { ErrorState } from 'src/components/ErrorState';
import { LoadingState } from 'src/components/LoadingState';
import { StatisticsBox } from 'src/components/Statistics/StatisticsBox';
import { DocumentStatisticsBox } from 'src/components/Statistics/DocumentStatisticsBox';
import { DocumentsTableHeaderStatistics } from 'src/components/Statistics/DocumentsTableHeaderStatistics';

const STATISTICS_BOX_WIDTH = 350;
const DOCUMENT_STATISTIC_BOX_WIDTH = 450;

const INITIAL_RESSOURCE_FILTER = { route: undefined, source: undefined, userId: undefined } as ressourceFilterType;

const INITIAL_DOCUMENT_SEARCH: { documentNumber: number | undefined } = { documentNumber: undefined };

export function Statistics() {
  const theme = useCustomTheme();
  const styles = buildStyles(theme);
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

  const users = workingUsersInfo.data.map(({ _id, name }) => ({ _id, name }));
  const aggregatedStatistics = aggregatedStatisticsInfo.data;
  const searchedDocumentNumber = documentStatisticsInfo.params.documentNumber;
  const documentStatistics = documentStatisticsInfo.status === 'success' ? documentStatisticsInfo.data : undefined;

  const titleAlert =
    searchedDocumentNumber == undefined ? <p> {wordings.statisticsPage.specificStatisticsHintMessage} </p> : <p> </p>;
  return (
    <div>
      <div style={styles.table}>
        <DocumentsTableHeaderStatistics
          availableStatisticFilters={availableStatisticFiltersInfo.data}
          users={users}
          refetch={aggregatedStatisticsInfo.refetch}
          isLoading={aggregatedStatisticsInfo.isRefetching}
          ressourceFilter={aggregatedStatisticsInfo.params}
          documentNumber={searchedDocumentNumber}
          setSearchedDocumentNumber={(documentNumber) => documentStatisticsInfo.refetch({ documentNumber })}
        />
      </div>
      <div style={styles.body}>
        <div style={styles.row}>
          {aggregatedStatistics === null ? (
            <div style={styles.numberOfDecisionContainer}>
              <Text variant="h1">{wordings.statisticsPage.agregatedStatisticsHintMessage}</Text>
            </div>
          ) : (
            <>
              <div style={styles.numberOfDecisionContainer}>
                <Text variant="h1">{wordings.statisticsPage.treatedDecisions}</Text>
                <Text variant="h1">{aggregatedStatistics.total}</Text>
              </div>
              <StatisticsBox
                aggregatedStatistic={aggregatedStatistics.cumulatedValue}
                statisticsCount={aggregatedStatistics.total}
                width={STATISTICS_BOX_WIDTH}
              />
            </>
          )}
        </div>
        <hr style={styles.hrLine} />
        <div style={styles.row}>
          {documentStatisticsInfo.status === 'error' ? (
            <ErrorState route="documentStatistics" errorCode={documentStatisticsInfo.statusCode} />
          ) : documentStatistics?.length == 0 ? (
            <div style={styles.numberOfDecisionContainer}>
              <Text variant="h1">{wordings.statisticsPage.specificStatisticsNotFound}</Text>
            </div>
          ) : (
            <>
              <div style={styles.numberOfDecisionContainer}>
                <Text variant="h1">
                  <p>{titleAlert}</p>
                </Text>
              </div>
              <div style={styles.rowBox}>
                {documentStatistics?.map((documentStatistic) => {
                  return (
                    <div key={documentStatistic._id}>
                      <DocumentStatisticsBox
                        documentStatistic={documentStatistic}
                        width={DOCUMENT_STATISTIC_BOX_WIDTH}
                      />
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
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

function buildStyles(theme: customThemeType) {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      height: heights.statisticsHeaderHeight,
      width: widths.adminContent,
    },
    filtersContainer: {
      paddingTop: theme.spacing * 2,
      paddingLeft: theme.spacing * 3,
    },
    body: {
      height: '70%',
      width: widths.adminContent,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    row: {
      width: widths.adminContent,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    rowBox: {
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      overflow: 'auto',
    },
    numberOfDecisionContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingBottom: theme.spacing * 3,
      width: `${STATISTICS_BOX_WIDTH}px`,
    },
    hrLine: {
      border: 'none',
      borderLeft: '1px solid hsla(200, 10%, 50%,100)',
      height: '70%',
      width: ' 1px',
    },
    table: {
      paddingLeft: theme.spacing * 3,
      paddingRight: theme.spacing * 2,
    },
  } as const;
}
