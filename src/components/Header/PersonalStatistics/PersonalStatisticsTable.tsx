import React, { useState } from 'react';
import dateFormat from 'dateformat';
import { Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { apiRouteOutType } from 'src/api/apiRouteType';
import { wordings } from 'src/wordings';

export type PersonalStatistics = apiRouteOutType<'get', 'personalStatistics'>;
type SortableColumn = keyof PersonalStatistics[number];
type SortDirection = 'asc' | 'desc';

type PersonalStatisticsTableProps = {
  personalStatistics: PersonalStatistics;
};

const COLUMNS: Array<{ id: SortableColumn; title: string }> = [
  { id: 'day', title: wordings.business.filters.columnTitles.treatmentDate },
  { id: 'total', title: wordings.statisticsPage.box.computation.total },
];

export function PersonalStatisticsTable({ personalStatistics }: PersonalStatisticsTableProps) {
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

  function sortStatistics() {
    if (!sortColumn) return personalStatistics;
    const direction = sortDirection === 'asc' ? 1 : -1;
    return [...personalStatistics].sort((a, b) => (a[sortColumn] - b[sortColumn]) * direction);
  }

  return (
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
        {sortStatistics().map(({ day, total }) => (
          <TableRow key={day}>
            <TableCell>{dateFormat(day, 'dd/mm')}</TableCell>
            <TableCell>{total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
