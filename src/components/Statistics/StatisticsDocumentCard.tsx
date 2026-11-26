import React from 'react';
import { isEqual, uniqWith } from 'lodash';
import { Stack, Typography } from '@mui/material';
import { apiRouteOutType } from 'src/api/apiRouteType';
import { boxShadow } from 'src/theme/constants';
import { convertDurationToReadableDuration, convertTimestampToReadableDate } from 'src/utils/timeOperator';
import { wordings } from 'src/wordings';

export type DocumentStatistics = apiRouteOutType<'get', 'documentStatistics'>[number];

type StatisticsDocumentCardProps = {
  documentStatistics: DocumentStatistics;
};

type Row = {
  label: string;
  value: string | number | undefined;
};

const { fields } = wordings.statisticsPage.box;

const DOCUMENT_ROWS: Array<{ label: string; getValue: (statistics: DocumentStatistics) => Row['value'] }> = [
  { label: fields.wordsCount, getValue: (statistics) => statistics.wordsCount },
  { label: fields.annotationsCount, getValue: (statistics) => statistics.annotationsCount },
  { label: fields.subAnnotationsSensitiveCount, getValue: (statistics) => statistics.subAnnotationsSensitiveCount },
  {
    label: fields.subAnnotationsNonSensitiveCount,
    getValue: (statistics) => statistics.subAnnotationsNonSensitiveCount,
  },
  { label: fields.surAnnotationsCount, getValue: (statistics) => statistics.surAnnotationsCount },
  { label: fields.documentNumber, getValue: (statistics) => statistics.documentNumber },
  { label: fields.NACCode, getValue: (statistics) => statistics.NACCode },
  { label: fields.chamberName, getValue: (statistics) => statistics.chamberName },
  { label: fields.circuit, getValue: (statistics) => statistics.route },
  { label: fields.importer, getValue: (statistics) => statistics.importer },
  { label: fields.juridiction, getValue: (statistics) => statistics.jurisdiction },
  {
    label: fields.decisionDate,
    getValue: (statistics) =>
      statistics.decisionDate ? convertTimestampToReadableDate(statistics.decisionDate) : undefined,
  },
  { label: fields.treatmentDate, getValue: (statistics) => convertTimestampToReadableDate(statistics.treatmentDate) },
];

export function StatisticsDocumentCard({ documentStatistics }: StatisticsDocumentCardProps) {
  const documentRows = DOCUMENT_ROWS.map(({ label, getValue }) => ({ label, value: getValue(documentStatistics) }));
  const rows = [
    ...documentRows.filter(({ value }) => value !== undefined && value !== null && value !== ''),
    ...buildTreatmentRows(),
  ];

  function buildTreatmentRows(): Row[] {
    const treatments = uniqWith(
      (documentStatistics.treatmentsSummary ?? []).filter((treatment) => treatment !== null),
      isEqual,
    );

    if (treatments.length === 0) {
      return [
        { label: fields.agent, value: 'N/A' },
        { label: fields.treatmentDuration, value: 'N/A' },
      ];
    }

    return [
      { label: fields.agent, value: treatments.map(({ name }) => name || 'N/A').join(', ') },
      {
        label: fields.treatmentDuration,
        value: treatments
          .map(({ treatmentDuration }) => convertDurationToReadableDuration(treatmentDuration))
          .join(', '),
      },
    ];
  }

  return (
    <Stack sx={{ gap: 0.5, width: 1, maxWidth: 450, p: 4, borderRadius: 2, boxShadow: boxShadow.minor.out }}>
      {rows.map(({ label, value }) => (
        <Stack key={label} direction="row" sx={{ justifyContent: 'space-between', gap: 2 }}>
          <Typography>{label}</Typography>
          <Typography color="text.primary">{value}</Typography>
        </Stack>
      ))}
    </Stack>
  );
}
