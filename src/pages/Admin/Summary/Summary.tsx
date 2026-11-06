import React from 'react';
import { Box, CircularProgress, IconButton, SxProps, Theme, Tooltip, Typography } from '@mui/material';
import { LoopRounded } from '@mui/icons-material';
import { apiRouteOutType } from 'src/core';
import { apiCaller, useApi } from 'src/api';
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

const REFRESH_BUTTON_SIZE = 40;

const refreshButtonSx: SxProps<Theme> = (theme) => ({
  width: REFRESH_BUTTON_SIZE,
  height: REFRESH_BUTTON_SIZE,
  bgcolor: 'primary.main',
  color: 'primary.contrastText',
  '&:hover': {
    bgcolor: 'primary.dark',
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },
});

export function Summary() {
  const summaryInfo = useApi(() => apiCaller.get<'summary'>('summary'), {});

  return (
    <DataFetcher
      buildComponentWithData={(summary: SummaryData) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, pl: 3, pr: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              p: 2,
            }}
          >
            {summaryInfo.isLoaded ? (
              <Tooltip arrow title={wordings.shared.refresh}>
                <IconButton onClick={summaryInfo.refetch} sx={refreshButtonSx}>
                  <LoopRounded />
                </IconButton>
              </Tooltip>
            ) : (
              <CircularProgress size={REFRESH_BUTTON_SIZE} />
            )}
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
            <Typography variant="h1" sx={{ fontSize: 50, pb: 7 }}>
              {wordings.summaryPage.welcomeMessage}
            </Typography>
            <Box sx={{ width: 350, p: 4, borderRadius: 2, boxShadow: boxShadow.minor.out }}>
              {SUMMARY_FIELDS.map((field) => (
                <Box
                  key={field}
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 30 }}
                >
                  <Typography>{wordings.summaryPage.box.fields[field]}</Typography>
                  <Typography>{summary[field]}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}
      fetchInfo={summaryInfo}
      route="summary"
    />
  );
}
