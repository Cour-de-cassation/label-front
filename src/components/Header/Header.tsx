import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { AppBar, Box, MenuItem, Select, Toolbar } from '@mui/material';
import { heights } from 'src/theme/layout';
import { PersonalStatisticsButton } from './PersonalStatistics/PersonalStatisticsButton';
import { SettingsButton } from './Settings/SettingsButton';
import { useCtxUser } from '../../contexts/user.context';
import { defaultRoutes } from '../../router/routes';
import { adminViews, localStorage } from '../../services/localStorage';
import { wordings } from '../../wordings';

type AdminView = (typeof adminViews)[number];

type HeaderProps = {
  setSlotElement: (element: HTMLElement | null) => void;
};

export function Header({ setSlotElement }: HeaderProps) {
  const { user, loading } = useCtxUser();
  const navigate = useNavigate();
  const [adminView, setAdminView] = useState<AdminView>(() => localStorage.adminViewHandler.get() || 'admin');

  function onChangeAdminView(adminView: AdminView) {
    localStorage.adminViewHandler.set(adminView);
    setAdminView(adminView);
    navigate(defaultRoutes[adminView]);
  }

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
          {user?.role === 'admin' && (
            <Select
              size="small"
              value={adminView}
              onChange={(event) => onChangeAdminView(event.target.value)}
              inputProps={{ 'aria-label': wordings.business.adminViews.label }}
            >
              {adminViews.map((view) => (
                <MenuItem key={view} value={view}>
                  {wordings.business.adminViews.values[view]}
                </MenuItem>
              ))}
            </Select>
          )}
          <PersonalStatisticsButton />
          <SettingsButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
