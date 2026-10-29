import { use } from 'react';
import { ViewerScrollerContext } from './ViewerScrollerContextProvider';

export { useViewerScrollerHandler };

function useViewerScrollerHandler() {
  return use(ViewerScrollerContext);
}
