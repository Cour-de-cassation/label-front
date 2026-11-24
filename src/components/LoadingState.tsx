import React from 'react';
import { CircularProgress, Stack, Typography } from '@mui/material';
import { wordings } from 'src/wordings';

export function LoadingState() {
  return (
    <Stack sx={{ justifyContent: 'center', alignItems: 'center', gap: 4, height: 1 }}>
      <CircularProgress size={36} />
      <Typography>{wordings.loadingState}</Typography>
    </Stack>
  );
}
