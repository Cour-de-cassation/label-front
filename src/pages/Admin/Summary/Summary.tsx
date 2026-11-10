import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { apiRouteOutType } from 'src/api/apiRouteType';
import { apiCaller, useApi } from 'src/api';
import { RefreshButton } from 'src/components/RefreshButton';
import { DataFetcher } from 'src/pages/DataFetcher';
import { boxShadow } from 'src/theme/constants';
import { wordings } from 'src/wordings';

type SummaryData = apiRouteOutType<'get', 'summary'>;

const SUMMARY_FIELDS = [
  'freeDocuments',
  'pendingDocuments',
  'savedDocuments',
  'doneDocuments',
  'lockedDocuments',
] as const satisfies Array<keyof SummaryData>;

export function Summary() {
  const summaryInfo = useApi(() => apiCaller.get<'summary'>('summary'), {});

  return (
    <DataFetcher
      buildComponentWithData={(summary: SummaryData) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              pt: 5,
              pr: 4,
            }}
          >
            <RefreshButton onClick={summaryInfo.refetch} isLoading={!summaryInfo.isLoaded} />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}
          >
            <Typography variant="h1" sx={{ fontSize: 50, mb: 7 }}>
              {wordings.summaryPage.welcomeMessage}
            </Typography>
            <Stack spacing={2} sx={{ width: 350, p: 4, borderRadius: 2, boxShadow: boxShadow.minor.out }}>
              {SUMMARY_FIELDS.map((field) => (
                <Stack
                  key={field}
                  direction="row"
                  spacing={2}
                  sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Typography>{wordings.summaryPage.box.fields[field]}</Typography>
                  <Typography>{summary[field]}</Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Box>
      )}
      fetchInfo={summaryInfo}
      route="summary"
    />
  );
}
