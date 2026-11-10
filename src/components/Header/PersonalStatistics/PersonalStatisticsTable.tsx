import React, { useState } from 'react';
import dateFormat from 'dateformat';
import { Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { apiRouteOutType } from 'src/api/apiRouteType';
import { apiCaller, useApi } from '../../../api';
import { DataFetcher } from '../../../pages/DataFetcher';
import { wordings } from '../../../wordings';

type PersonalStatistics = apiRouteOutType<'get', 'personalStatistics'>;
type SortableColumn = keyof PersonalStatistics[number];
type SortDirection = 'asc' | 'desc';

const COLUMNS: Array<{ id: SortableColumn; title: string }> = [
  { id: 'day', title: wordings.business.filters.columnTitles.treatmentDate },
  { id: 'total', title: wordings.statisticsPage.box.computation.total },
];

export function PersonalStatisticsTable() {
  const personalStatisticsInfo = useApi(() => apiCaller.get<'personalStatistics'>('personalStatistics'), {});
  const [sortColumn, setSortColumn] = useState<SortableColumn>();
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  function onSort(column: SortableColumn) {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  }

  function sortStatistics(personalStatistics: PersonalStatistics) {
    if (!sortColumn) return personalStatistics;
    const direction = sortDirection === 'asc' ? 1 : -1;
    return [...personalStatistics].sort((a, b) => (a[sortColumn] - b[sortColumn]) * direction);
  }

  return (
    <DataFetcher
      buildComponentWithData={(personalStatistics: PersonalStatistics) => (
        <Table size="small">
          <TableHead>
            <TableRow>
              {COLUMNS.map(({ id, title }) => (
                <TableCell key={id}>
                  <TableSortLabel
                    active={sortColumn === id}
                    direction={sortColumn === id ? sortDirection : 'asc'}
                    onClick={() => onSort(id)}
                  >
                    {title}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortStatistics(personalStatistics).map(({ day, total }) => (
              <TableRow key={day}>
                <TableCell>{dateFormat(day, 'dd/mm')}</TableCell>
                <TableCell>{total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      fetchInfo={personalStatisticsInfo}
      route="personalStatistics"
    />
  );
}
