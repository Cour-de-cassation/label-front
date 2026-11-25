import React from 'react';
import { Stack } from '@mui/material';
import { DocumentNumberTextInput } from 'src/components/DocumentNumberTextInput';
import { StatisticsFilters, StatisticsFiltersProps } from './StatisticsFilters';

type StatisticsHeaderProps = StatisticsFiltersProps & {
  documentNumber: number | undefined;
  onSearchDocumentNumber: (documentNumber: number | undefined) => void;
};

export function StatisticsHeader({ documentNumber, onSearchDocumentNumber, ...filtersProps }: StatisticsHeaderProps) {
  return (
    <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', gap: 2, pt: 4, pl: 3, pr: 4 }}>
      <StatisticsFilters {...filtersProps} />
      <DocumentNumberTextInput value={documentNumber} onChange={onSearchDocumentNumber} />
    </Stack>
  );
}
