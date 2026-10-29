import { use } from 'react';
import { AlertHandlerContext } from './AlertHandler';

export { useAlert };

function useAlert() {
  return use(AlertHandlerContext);
}
