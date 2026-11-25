import React from 'react';
import { Box } from '@mui/material';
import { FilterButton, FilterChip } from 'src/components';
import { buildStatisticsFilters, StatisticsFiltersParams } from './statisticsFilters';

export type StatisticsFiltersProps = StatisticsFiltersParams & {
  isLoading: boolean;
};

export function StatisticsFilters({ isLoading, ...filtersParams }: StatisticsFiltersProps) {
  const filters = buildStatisticsFilters(filtersParams);

  return (
    <Box sx={{ display: 'flex' }}>
      <FilterButton filters={filters} isLoading={isLoading} />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', pl: 1 }}>
        {filters.map((filter) => (
          <FilterChip key={filter.name} filter={filter} />
        ))}
      </Box>
    </Box>
  );
}
