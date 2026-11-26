import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { IconButton, Tooltip, Typography } from '@mui/material';
import { ChevronLeftRounded } from '@mui/icons-material';
import { annotationsDiffType } from 'src/types/annotation';
import { documentType } from 'src/types/document';
import { apiCaller, useApi } from 'src/api';
import { ErrorState } from 'src/components/ErrorState';
import { LoadingState } from 'src/components/LoadingState';
import { HeaderSlot } from 'src/components/Header/HeaderSlot';
import {
  AnnotatorStateHandlerContextProvider,
  buildAnnotationsCommitter,
  buildAutoSaver,
} from 'src/services/annotatorState';
import { DocumentAnnotator } from 'src/pages/Home/DocumentAnnotator';
import { fetchSettings } from 'src/utils/settings/fetchSettings';
import { useAlert } from 'src/services/alert';
import { wordings } from 'src/wordings';
import { useCtxUser } from 'src/contexts/user.context';
import { computeFilteredSettings } from 'src/utils/settings/computeFilteredSettings';

export function DocumentInspector() {
  const { documentId = '' } = useParams<'documentId'>();

  return <DocumentInspectorContent key={documentId} documentId={documentId} />;
}

function DocumentInspectorContent({ documentId }: { documentId: string }) {
  const navigate = useNavigate();
  const { displayAlert } = useAlert();
  const { user } = useCtxUser();
  const settingsInfo = useApi(fetchSettings, {});
  const documentInfo = useApi(() => apiCaller.get('document', { documentId }), {});
  const annotationsInfo = useApi(() => apiCaller.get('annotations', { documentId }), {});

  useEffect(() => {
    const userRole = user?.role;
    if (userRole === 'scrutator') {
      displayAlert({ variant: 'info', text: wordings.homePage.scrutatorInfo, autoHide: true });
    }
  }, [displayAlert, user?.role]);

  if (settingsInfo.status === 'error') {
    return <ErrorState route="settings" errorCode={settingsInfo.statusCode} />;
  }
  if (documentInfo.status === 'error') {
    return <ErrorState route="document" errorCode={documentInfo.statusCode} />;
  }
  if (annotationsInfo.status === 'error') {
    return <ErrorState route="annotations" errorCode={annotationsInfo.statusCode} />;
  }
  if (settingsInfo.status === 'loading' || documentInfo.status === 'loading' || annotationsInfo.status === 'loading') {
    return <LoadingState />;
  }

  const document = documentInfo.data;
  const settingsForDocument = computeFilteredSettings(
    settingsInfo.data,
    document.decisionMetadata.categoriesToOmit,
    document.decisionMetadata.additionalTermsToAnnotate,
    document.decisionMetadata.motivationOccultation,
  );

  async function applyAutoSave(annotationsDiff: annotationsDiffType) {
    try {
      await apiCaller.post<'updateTreatmentForDocumentId'>('updateTreatmentForDocumentId', {
        annotationsDiff,
        documentId: document._id,
      });
    } catch (error) {
      displayAlert({ variant: 'alert', text: wordings.business.errors.updateTreatmentFailed, autoHide: true });
      console.warn(error);
    }
  }

  function buildOnStopAnnotatingDocument(document: documentType) {
    if (document.route !== 'confirmation' && document.route !== 'request') {
      return undefined;
    }

    return async () => {
      navigate(-1);
    };
  }

  return (
    <AnnotatorStateHandlerContextProvider
      autoSaver={buildAutoSaver({ applySave: applyAutoSave })}
      committer={buildAnnotationsCommitter()}
      initialAnnotatorState={{
        annotations: annotationsInfo.data,
        document,
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
}
