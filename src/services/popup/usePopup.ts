import { use } from 'react';
import { PopupHandlerContext } from './PopupHandler';

export { usePopup };

function usePopup() {
  return use(PopupHandlerContext);
}
