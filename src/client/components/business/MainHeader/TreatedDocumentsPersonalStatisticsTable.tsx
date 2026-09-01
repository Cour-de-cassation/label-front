import React from 'react';
import dateFormat from 'dateformat';
import { Table, tableRowFieldType } from 'pelta-design-system';
import { apiRouteOutType } from 'src/core';
import { wordings } from '../../../wordings';

export { TreatedDocumentsPersonalStatisticsTable };

const PERSONAL_STATISTICS_TEXT_CELL_MAX_WIDTH = 400;

function TreatedDocumentsPersonalStatisticsTable(props: {
  refetch: () => void;
  personalStatistics: apiRouteOutType<'get', 'personalStatistics'>;
}) {
  const treatedDocumentsPersonalStatisticsFields = buildtreatedDocumentsPersonalStatisticsFields();

  return <Table data={props.personalStatistics} fields={treatedDocumentsPersonalStatisticsFields} />;

  function buildtreatedDocumentsPersonalStatisticsFields(): Array<
    tableRowFieldType<apiRouteOutType<'get', 'personalStatistics'>[number]>
  > {
    return [
      {
        id: 'day',
        canBeSorted: true,
        title: wordings.business.filters.columnTitles.treatmentDate,
        extractor: (personalStatistic) => dateFormat(personalStatistic.day, 'dd/mm'),
        width: 10,
        cellStyle: { maxWidth: `${PERSONAL_STATISTICS_TEXT_CELL_MAX_WIDTH}px`, overflow: 'hidden' },
      },

      {
        id: 'total',
        canBeSorted: true,
        title: wordings.statisticsPage.box.computation.total,
        extractor: (personalStatistic) => personalStatistic.total,
        width: 10,
        cellStyle: { maxWidth: `${PERSONAL_STATISTICS_TEXT_CELL_MAX_WIDTH}px`, overflow: 'hidden' },
      },
    ];
  }
}
