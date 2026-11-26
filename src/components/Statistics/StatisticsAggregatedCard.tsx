import React, { useState } from 'react';
import { Stack, SxProps, Theme, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { apiRouteOutType } from 'src/api/apiRouteType';
import { boxShadow } from 'src/theme/constants';
import { convertDurationToReadableDuration } from 'src/utils/timeOperator';
import { wordings } from 'src/wordings';

type CumulatedValue = apiRouteOutType<'get', 'aggregatedStatistics'>['cumulatedValue'];

type Computation = 'average' | 'total';

type StatisticsAggregatedCardProps = {
  cumulatedValue: CumulatedValue;
  total: number;
};

const COUNT_FIELDS = [
  'wordsCount',
  'annotationsCount',
  'subAnnotationsSensitiveCount',
  'subAnnotationsNonSensitiveCount',
  'surAnnotationsCount',
] as const satisfies Array<keyof CumulatedValue>;

const toggleGroupSx: SxProps<Theme> = {
  height: 24,
  borderRadius: 2,
  boxShadow: boxShadow.minor.in,
  '& .MuiToggleButtonGroup-grouped': {
    border: 0,
    borderRadius: 2,
    px: 2,
    typography: 'h3',
    color: 'text.secondary',
    '&:hover': { bgcolor: 'transparent' },
    '&.Mui-selected, &.Mui-selected:hover': { bgcolor: 'primary.main', color: 'text.primary' },
  },
};

export function StatisticsAggregatedCard({ cumulatedValue, total }: StatisticsAggregatedCardProps) {
  const [computation, setComputation] = useState<Computation>('average');

  const rows = [
    ...COUNT_FIELDS.map((field) => ({
      label: wordings.statisticsPage.box.fields[field],
      value: computeCount(cumulatedValue[field]),
    })),
    {
      label: wordings.statisticsPage.box.fields.treatmentDuration,
      value: convertDurationToReadableDuration(computeDuration(cumulatedValue.treatmentDuration)),
    },
  ];

  function computeCount(value: number) {
    if (computation === 'total') {
      return value;
    }
    return total ? (value / total).toFixed(2) : 0;
  }

  function computeDuration(value: number) {
    if (computation === 'total') {
      return value;
    }
    return total ? Math.floor(value / total) : 0;
  }

  return (
    <Stack
      sx={{
        alignItems: 'center',
        gap: 6,
        width: 1,
        maxWidth: 350,
        p: 4,
        borderRadius: 2,
        boxShadow: boxShadow.minor.out,
      }}
    >
      <ToggleButtonGroup
        exclusive
        value={computation}
        onChange={(_, value: Computation | null) => value && setComputation(value)}
        sx={toggleGroupSx}
      >
        <ToggleButton value="total">{wordings.statisticsPage.box.computation.total}</ToggleButton>
        <ToggleButton value="average">{wordings.statisticsPage.box.computation.average}</ToggleButton>
      </ToggleButtonGroup>
      <Stack sx={{ gap: 1.5, width: 1 }}>
        {rows.map(({ label, value }) => (
          <Stack key={label} direction="row" sx={{ justifyContent: 'space-between' }}>
            <Typography>{label}</Typography>
            <Typography>{value}</Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
