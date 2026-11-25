import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { annotationsDiffType } from 'src/types/annotation';
import { documentType } from 'src/types/document';
import { settingsType } from 'src/types/settings';
import { apiCaller } from 'src/api';
import { IconButton, Tooltip, Typography } from '@mui/material';
import { ChevronLeftRounded } from '@mui/icons-material';
import { HeaderSlot } from 'src/components/Header/HeaderSlot';
import {
  AnnotatorStateHandlerContextProvider,
  buildAnnotationsCommitter,
  buildAutoSaver,
} from 'src/services/annotatorState';
import { DocumentAnnotator } from 'src/pages/Home/DocumentAnnotator';
import { useAlert } from 'src/services/alert';
import { wordings } from 'src/wordings';
import { AnnotationsDataFetcher } from 'src/pages/Admin/AnnotationsDataFetcher';
import { DocumentDataFetcher } from 'src/pages/Admin/DocumentDataFetcher';
import { useCtxUser } from 'src/contexts/user.context';
import { computeFilteredSettings } from 'src/utils/settings/computeFilteredSettings';

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
            const settingsForDocument = computeFilteredSettings(
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
                <HeaderSlot>
                  <Tooltip arrow title={wordings.shared.back}>
                    <IconButton color="neutral" onClick={() => navigate(-1)}>
                      <ChevronLeftRounded />
                    </IconButton>
                  </Tooltip>
                  <Typography>{document.title}</Typography>
                </HeaderSlot>
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
