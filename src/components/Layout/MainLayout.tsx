import React, { useState } from 'react';
import { Outlet } from 'react-router';
import { Box } from '@mui/material';
import { Header } from '../Header/Header';
import { HeaderSlotContext } from '../Header/HeaderSlot';

export function MainLayout() {
  const [headerSlotElement, setHeaderSlotElement] = useState<HTMLElement | null>(null);

  return (
    <HeaderSlotContext value={headerSlotElement}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Header setSlotElement={setHeaderSlotElement} />
        <Box sx={{ display: 'flex', flex: 1, minHeight: 0 }}>
          <Outlet />
        </Box>
      </Box>
    </HeaderSlotContext>
  );
}
