import React, { useState } from 'react';
import { Outlet } from 'react-router';
import { MainHeader } from '../MainHeader/MainHeader';
import { MainHeaderSlotContext } from '../MainHeader/MainHeaderSlot';

export function MainLayout() {
  const [headerSlotElement, setHeaderSlotElement] = useState<HTMLElement | null>(null);

  return (
    <MainHeaderSlotContext value={headerSlotElement}>
      <MainHeader setSlotElement={setHeaderSlotElement} />
      <Outlet />
    </MainHeaderSlotContext>
  );
}
