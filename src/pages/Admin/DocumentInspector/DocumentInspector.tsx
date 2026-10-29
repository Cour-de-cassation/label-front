import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { annotationsDiffType, documentType, settingsModule, settingsType } from 'src/core';
import { apiCaller } from '../../../api';
import { MainHeader } from '../../../components';
import {
  AnnotatorStateHandlerContextProvider,
  buildAnnotationsCommitter,
  buildAutoSaver,
} from '../../../services/annotatorState';
import { DocumentAnnotator } from '../../Home/DocumentAnnotator';
import { useAlert } from '../../../services/alert';
import { wordings } from '../../../wordings';
import { AnnotationsDataFetcher } from './AnnotationsDataFetcher';
import { DocumentDataFetcher } from './DocumentDataFetcher';
import { useCtxUser } from '../../../contexts/user.context';

export { DocumentInspector };

function DocumentInspector(props: { settings: settingsType }) {
  const { documentId = '' } = useParams<'documentId'>();
  const navigate = useNavigate();
  const { displayAlert } = useAlert();
  const { user } = useCtxUser();

  useEffect(() => {
    const userRole = user?.role;
    if (userRole === 'scrutator') {
      displayAlert({ variant: 'info', text: wordings.homePage.scrutatorInfo, autoHide: true });
    }
  }, [displayAlert, user?.role]);

  return (
    <DocumentDataFetcher documentId={documentId}>
      {({ document }) => (
        <AnnotationsDataFetcher documentId={documentId}>
          {({ annotations }) => {
            const settingsForDocument = settingsModule.lib.computeFilteredSettings(
              props.settings,
              document.decisionMetadata.categoriesToOmit,
              document.decisionMetadata.additionalTermsToAnnotate,
              document.decisionMetadata.motivationOccultation,
            );

            const applyAutoSave = buildApplyAutoSave(document._id);

            return (
              <AnnotatorStateHandlerContextProvider
                autoSaver={buildAutoSaver({ applySave: applyAutoSave })}
                committer={buildAnnotationsCommitter()}
                initialAnnotatorState={{
                  annotations: annotations,
                  document: document,
                  settings: settingsForDocument,
                }}
              >
                <MainHeader title={document.title} onBackButtonPress={() => navigate(-1)} />
                <DocumentAnnotator onStopAnnotatingDocument={buildOnStopAnnotatingDocument(document)} />
              </AnnotatorStateHandlerContextProvider>
            );
          }}
        </AnnotationsDataFetcher>
      )}
    </DocumentDataFetcher>
  );

  function buildOnStopAnnotatingDocument(document: documentType) {
    if (document.route !== 'confirmation' && document.route !== 'request') {
      return undefined;
    }

    return async () => {
      navigate(-1);
    };
  }

  function buildApplyAutoSave(documentId: string) {
    return applyAutoSave;

    async function applyAutoSave(annotationsDiff: annotationsDiffType) {
      try {
        await apiCaller.post<'updateTreatmentForDocumentId'>('updateTreatmentForDocumentId', {
          annotationsDiff,
          documentId,
        });
      } catch (error) {
        displayAlert({ variant: 'alert', text: wordings.business.errors.updateTreatmentFailed, autoHide: true });
        console.warn(error);
      }
    }
  }
}
