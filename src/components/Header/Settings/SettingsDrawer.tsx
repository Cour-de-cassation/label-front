import React from 'react';
import {
  Box,
  Button,
  Drawer,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Tooltip,
  Typography,
} from '@mui/material';
import { CloseRounded, PowerSettingsNewRounded } from '@mui/icons-material';
import { displayModeType, useDisplayMode } from 'src/theme';
import { heights } from 'src/theme/layout';
import { wordings } from '../../../wordings';
import { useCtxUser } from '../../../contexts/user.context';

type SettingsDrawerProps = {
  close: () => void;
  isOpen: boolean;
};

export function SettingsDrawer({ close, isOpen }: SettingsDrawerProps) {
  const { displayMode, setDisplayMode } = useDisplayMode();
  const { user, onLogout } = useCtxUser();

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={close}
      sx={{ '& .MuiDrawer-paper': { top: heights.header, bottom: 0, height: 'auto', px: 8 } }}
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
        <Typography variant="h1">{wordings.shared.settingsDrawer.title}</Typography>
        <Tooltip arrow title={wordings.shared.cancel}>
          <IconButton color="neutral" onClick={close}>
            <CloseRounded />
          </IconButton>
        </Tooltip>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: 600, overflow: 'auto', pb: 4 }}>
        <Box sx={{ pt: 6 }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
            {wordings.business.account}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', pl: 5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                {user?.name}
              </Typography>
              <Typography>{user?.email}</Typography>
            </Box>
            <Button variant="contained" color="neutral" startIcon={<PowerSettingsNewRounded />} onClick={onLogout}>
              {wordings.shared.logout}
            </Button>
          </Box>
        </Box>
        <Box sx={{ pt: 6 }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
            {wordings.shared.settingsDrawer.displayMode}
          </Typography>
          <RadioGroup
            value={displayMode}
            onChange={(event) => setDisplayMode(event.target.value as displayModeType)}
            sx={{ pl: 5 }}
          >
            <FormControlLabel value="lightMode" control={<Radio />} label={wordings.shared.settingsDrawer.lightMode} />
            <FormControlLabel value="darkMode" control={<Radio />} label={wordings.shared.settingsDrawer.darkMode} />
          </RadioGroup>
        </Box>
      </Box>
    </Drawer>
  );
}
