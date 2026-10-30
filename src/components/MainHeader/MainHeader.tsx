import React from 'react';
import { AppBar, Box, Toolbar } from '@mui/material';
import { heights } from 'src/theme/layout';
import { AdminViewDropdown } from './AdminViewDropdown';
import { PersonalStatisticsButton } from './PersonalStatisticsButton';
import { SettingsButton } from './SettingsButton';
import { useCtxUser } from '../../contexts/user.context';

type MainHeaderProps = {
  setSlotElement: (element: HTMLElement | null) => void;
};

export function MainHeader({ setSlotElement }: MainHeaderProps) {
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
          {user?.role === 'admin' && <AdminViewDropdown />}
          <PersonalStatisticsButton />
          <SettingsButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
