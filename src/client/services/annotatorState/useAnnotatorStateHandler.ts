import { use } from 'react';
import { AnnotatorStateHandlerContext } from './AnnotatorStateHandlerContextProvider';

export { useAnnotatorStateHandler };

function useAnnotatorStateHandler() {
  return use(AnnotatorStateHandlerContext);
}
