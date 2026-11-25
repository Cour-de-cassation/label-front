import React from 'react';
import { Stack, Typography } from '@mui/material';
import { apiRouteOutType } from 'src/api/apiRouteType';
import { wordings } from 'src/wordings';
import { StatisticsAggregatedCard } from './StatisticsAggregatedCard';

type StatisticsAggregatedProps = {
  aggregatedStatistics: apiRouteOutType<'get', 'aggregatedStatistics'> | null;
};

export function StatisticsAggregated({ aggregatedStatistics }: StatisticsAggregatedProps) {
  return (
    <Stack sx={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 3, p: 3 }}>
      {aggregatedStatistics === null ? (
        <Typography variant="h1" sx={{ maxWidth: 350 }}>
          {wordings.statisticsPage.agregatedStatisticsHintMessage}
        </Typography>
      ) : (
        <>
          <Stack direction="row" sx={{ justifyContent: 'space-between', width: 1, maxWidth: 350 }}>
            <Typography variant="h1">{wordings.statisticsPage.treatedDecisions}</Typography>
            <Typography variant="h1">{aggregatedStatistics.total}</Typography>
          </Stack>
          <StatisticsAggregatedCard
            cumulatedValue={aggregatedStatistics.cumulatedValue}
            total={aggregatedStatistics.total}
          />
        </>
      )}
    </Stack>
  );
}
