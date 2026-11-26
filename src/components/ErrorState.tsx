import React from 'react';
import { useNavigate } from 'react-router';
import { Button, Stack, Typography } from '@mui/material';
import { LoopRounded, PowerSettingsNewRounded, ReportProblemRounded } from '@mui/icons-material';
import format from 'string-template';
import { wordings } from 'src/wordings';
import { useCtxUser } from 'src/contexts/user.context';

type ErrorStateProps = {
  route?: string;
  errorCode?: number;
};

export function ErrorState({ route, errorCode }: ErrorStateProps) {
  const navigate = useNavigate();
  const { onLogout } = useCtxUser();

  return (
    <Stack sx={{ justifyContent: 'center', alignItems: 'center', gap: 1, height: 1, textAlign: 'center' }}>
      <ReportProblemRounded sx={{ fontSize: 100, m: 3 }} />
      <Typography>{wordings.errorState.title}</Typography>
      {!!errorCode && (
        <Typography variant="body2">{format(wordings.errorState.errorCode, { code: errorCode })}</Typography>
      )}
      {route && <Typography variant="body2">{format(wordings.errorState.onRequest, { route })}</Typography>}
      <Button variant="contained" color="neutral" startIcon={<LoopRounded />} onClick={() => navigate(0)}>
        {wordings.shared.refresh}
      </Button>
      <Typography>{wordings.shared.or}</Typography>
      <Button variant="contained" color="neutral" startIcon={<PowerSettingsNewRounded />} onClick={onLogout}>
        {wordings.shared.logout}
      </Button>
    </Stack>
  );
}
