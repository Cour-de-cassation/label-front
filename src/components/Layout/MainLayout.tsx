import React, { useState } from 'react';
import { Outlet } from 'react-router';
import { Header } from '../Header/Header';
import { HeaderSlotContext } from '../Header/HeaderSlot';

export function MainLayout() {
  const [headerSlotElement, setHeaderSlotElement] = useState<HTMLElement | null>(null);

  return (
    <HeaderSlotContext value={headerSlotElement}>
      <Header setSlotElement={setHeaderSlotElement} />
      <Outlet />
    </HeaderSlotContext>
  );
}
