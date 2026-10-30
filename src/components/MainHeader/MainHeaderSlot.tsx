import { createContext, ReactNode, use } from 'react';
import { createPortal } from 'react-dom';

export const MainHeaderSlotContext = createContext<HTMLElement | null>(null);

export function MainHeaderSlot({ children }: { children: ReactNode }) {
  const slotElement = use(MainHeaderSlotContext);

  return slotElement ? createPortal(children, slotElement) : null;
}
