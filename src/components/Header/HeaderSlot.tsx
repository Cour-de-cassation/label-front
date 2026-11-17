import { createContext, ReactNode, use } from 'react';
import { createPortal } from 'react-dom';

export const HeaderSlotContext = createContext<HTMLElement | null>(null);

export function HeaderSlot({ children }: { children: ReactNode }) {
  const slotElement = use(HeaderSlotContext);

  return slotElement ? createPortal(children, slotElement) : null;
}
