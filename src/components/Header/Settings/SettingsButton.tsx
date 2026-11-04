import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { SettingsRounded } from '@mui/icons-material';
import { wordings } from '../../../wordings';
import { SettingsDrawer } from './SettingsDrawer';

export { SettingsButton };

function SettingsButton() {
  const [isSettingsDrawerOpen, setIsSettingsDrawerOpen] = useState(false);

  function toggleDrawer() {
    setIsSettingsDrawerOpen(!isSettingsDrawerOpen);
  }

  function closeDrawer() {
    setIsSettingsDrawerOpen(false);
  }

  return (
    <>
      <Tooltip arrow title={wordings.shared.settingsDrawer.title}>
        <IconButton color="neutral" onClick={toggleDrawer}>
          <SettingsRounded />
        </IconButton>
      </Tooltip>
      <SettingsDrawer isOpen={isSettingsDrawerOpen} close={closeDrawer} />
    </>
  );
}
