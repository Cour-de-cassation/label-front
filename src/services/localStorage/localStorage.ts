import { adminViewHandler, adminViews } from './adminViewHandler';
import {
  publishableDocumentOrderByProperties,
  publishableDocumentsStateHandler,
} from './documentStateHandler/publishableDocumentsStateHandler';
import {
  treatedDocumentsStateHandler,
  treatedDocumentOrderByProperties,
  treatedDocumentFilterType,
} from './documentStateHandler/treatedDocumentsStateHandler';
import {
  untreatedDocumentsStateHandler,
  untreatedDocumentOrderByProperties,
  untreatedDocumentFilterType,
} from './documentStateHandler/untreatedDocumentsStateHandler';
import {
  toBeConfirmedDocumentFilterType,
  toBeConfirmedDocumentOrderByProperties,
  toBeConfirmedDocumentsStateHandler,
} from './documentStateHandler/toBeConfirmedDocumentsStateHandler';

export {
  adminViews,
  publishableDocumentOrderByProperties,
  treatedDocumentOrderByProperties,
  untreatedDocumentOrderByProperties,
  toBeConfirmedDocumentOrderByProperties,
  localStorage,
};

export type { treatedDocumentFilterType, untreatedDocumentFilterType, toBeConfirmedDocumentFilterType };

const localStorage = {
  adminViewHandler,
  publishableDocumentsStateHandler,
  treatedDocumentsStateHandler,
  untreatedDocumentsStateHandler,
  toBeConfirmedDocumentsStateHandler,
};
