import React from 'react';
import { CircularProgress, IconButton, Tooltip } from '@mui/material';
import { LoopRounded } from '@mui/icons-material';
import { wordings } from 'src/wordings';

type RefreshButtonProps = {
  onClick: () => void;
  isLoading: boolean;
};

export function RefreshButton({ onClick, isLoading }: RefreshButtonProps) {
  if (isLoading) {
    return <CircularProgress size={40} />;
  }

  return (
    <Tooltip arrow title={wordings.shared.refresh}>
      <IconButton
        onClick={onClick}
        sx={(theme) => ({
          width: 40,
          height: 40,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          '&:hover': {
            bgcolor: 'primary.dark',
            color: theme.palette.getContrastText(theme.palette.primary.dark),
          },
        })}
      >
        <LoopRounded />
      </IconButton>
    </Tooltip>
  );
}
