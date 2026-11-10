import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { BarChart } from '@mui/icons-material';
import { wordings } from '../../../wordings';
import { PersonalStatisticsDrawer } from './PersonalStatisticsDrawer';

export { PersonalStatisticsButton };

function PersonalStatisticsButton() {
  const [isPersonalStatisticsDrawerOpen, setIsPersonalStatisticsDrawerOpen] = useState(false);

  function toggleDrawer() {
    setIsPersonalStatisticsDrawerOpen(!isPersonalStatisticsDrawerOpen);
  }

  function closeDrawer() {
    setIsPersonalStatisticsDrawerOpen(false);
  }

  return (
    <>
      <Tooltip arrow title={wordings.shared.personalStatisticsDrawer.title}>
        <IconButton color="neutral" onClick={toggleDrawer}>
          <BarChart />
        </IconButton>
      </Tooltip>
      <PersonalStatisticsDrawer isOpen={isPersonalStatisticsDrawerOpen} close={closeDrawer} />
    </>
  );
}
