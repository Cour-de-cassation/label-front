import React from 'react';
import { Box, Drawer, IconButton, Tooltip, Typography } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';
import { heights } from 'src/theme/layout';
import { wordings } from '../../../wordings';
import { TreatedDocumentsPersonalStatisticsTable } from './TreatedDocumentsPersonalStatisticsTable';
import { PersonalStatisticsDataFetcher } from './PersonalStatisticsDataFetcher';

type PersonalStatisticsDrawerProps = {
  close: () => void;
  isOpen: boolean;
};

export function PersonalStatisticsDrawer({ close, isOpen }: PersonalStatisticsDrawerProps) {
  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={close}
      sx={{ '& .MuiDrawer-paper': { mt: heights.header, height: heights.adminPanel, px: 8 } }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 4,
          pb: 3,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Typography variant="h1">{wordings.shared.personalStatisticsDrawer.title}</Typography>
        <Tooltip arrow title={wordings.shared.cancel}>
          <IconButton color="neutral" onClick={close}>
            <CloseRounded />
          </IconButton>
        </Tooltip>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: 600, overflow: 'auto', pb: 4 }}>
        <Box sx={{ pt: 6 }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
            {wordings.statisticsPage.treatedDecisions}
          </Typography>
          <Box sx={{ pl: 5 }}>
            <PersonalStatisticsDataFetcher>
              {({ personalStatistics, refetch }) => (
                <TreatedDocumentsPersonalStatisticsTable refetch={refetch} personalStatistics={personalStatistics} />
              )}
            </PersonalStatisticsDataFetcher>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}
