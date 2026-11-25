import React from 'react';
import { Stack, Typography } from '@mui/material';
import { ApiState } from 'src/api/useApi';
import { ErrorState } from 'src/components/ErrorState';
import { LoadingState } from 'src/components/LoadingState';
import { wordings } from 'src/wordings';
import { DocumentStatistics, StatisticsDocumentCard } from './StatisticsDocumentCard';

type StatisticsDocumentProps = {
  documentStatisticsInfo: ApiState<DocumentStatistics[] | null>;
};

export function StatisticsDocument({ documentStatisticsInfo }: StatisticsDocumentProps) {
  function renderContent() {
    switch (documentStatisticsInfo.status) {
      case 'loading':
        return <LoadingState />;
      case 'error':
        return <ErrorState route="documentStatistics" errorCode={documentStatisticsInfo.statusCode} />;
      case 'success':
        if (documentStatisticsInfo.data === null) {
          return renderMessage(wordings.statisticsPage.specificStatisticsHintMessage);
        }
        if (documentStatisticsInfo.data.length === 0) {
          return renderMessage(wordings.statisticsPage.specificStatisticsNotFound);
        }
        return documentStatisticsInfo.data.map((documentStatistics) => (
          <StatisticsDocumentCard key={documentStatistics._id} documentStatistics={documentStatistics} />
        ));
    }
  }

  function renderMessage(message: string) {
    return (
      <Typography variant="h1" sx={{ maxWidth: 450 }}>
        {message}
      </Typography>
    );
  }

  return (
    <Stack sx={{ flex: 1, minHeight: 0, overflow: 'auto', p: 3 }}>
      <Stack sx={{ alignItems: 'center', gap: 2, width: 1, m: 'auto' }}>{renderContent()}</Stack>
    </Stack>
  );
}
