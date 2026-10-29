import { use } from 'react';
import { DocumentViewerModeHandlerContext } from './DocumentViewerModeHandlerContextProvider';

export { useDocumentViewerModeHandler };

function useDocumentViewerModeHandler() {
  return use(DocumentViewerModeHandlerContext);
}
