import React from 'react';
import { AppBar, Box, Toolbar } from '@mui/material';
import { heights } from 'src/theme/layout';
import { HeaderSelectView } from './HeaderSelectView';
import { PersonalStatisticsButton } from './PersonalStatistics/PersonalStatisticsButton';
import { SettingsButton } from './Settings/SettingsButton';
import { useCtxUser } from '../../contexts/user.context';

type HeaderProps = {
  setSlotElement: (element: HTMLElement | null) => void;
};

export function Header({ setSlotElement }: HeaderProps) {
  const { user, loading } = useCtxUser();
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AppBar position="relative" color="inherit" elevation={1}>
      <Toolbar disableGutters sx={{ height: heights.header, pl: 1 }}>
        <Box ref={setSlotElement} sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 2,
            flex: 1,
            pr: 2,
            maxWidth: 350,
          }}
        >
          {user?.role === 'admin' && <HeaderSelectView />}
          <PersonalStatisticsButton />
          <SettingsButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
