import React from 'react';
import dateFormat from 'dateformat';
import { Table, tableRowFieldType } from 'src/pelta-design-system';
import { apiRouteOutType } from 'src/core';
import { apiCaller, useApi } from '../../../api';
import { DataFetcher } from '../../../pages/DataFetcher';
import { wordings } from '../../../wordings';

type PersonalStatistics = apiRouteOutType<'get', 'personalStatistics'>;

const PERSONAL_STATISTICS_TEXT_CELL_MAX_WIDTH = 400;

export function TreatedDocumentsPersonalStatisticsTable() {
  const personalStatisticsInfo = useApi(() => apiCaller.get<'personalStatistics'>('personalStatistics'), {});
  const treatedDocumentsPersonalStatisticsFields = buildtreatedDocumentsPersonalStatisticsFields();

  return (
    <DataFetcher
      buildComponentWithData={(personalStatistics: PersonalStatistics) => (
        <Table
          data={personalStatistics}
          getRowKey={(personalStatistic) => String(personalStatistic.day)}
          fields={treatedDocumentsPersonalStatisticsFields}
        />
      )}
      fetchInfo={personalStatisticsInfo}
      route="personalStatistics"
    />
  );

  function buildtreatedDocumentsPersonalStatisticsFields(): Array<tableRowFieldType<PersonalStatistics[number]>> {
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
