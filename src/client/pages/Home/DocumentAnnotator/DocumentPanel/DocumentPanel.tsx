import React, { ReactElement, useEffect } from 'react';
import { customThemeType, useCustomTheme } from 'src/pelta-design-system';
import { apiCaller } from '../../../../api';
import { useAnnotatorStateHandler } from '../../../../services/annotatorState';
import { useDocumentViewerModeHandler } from '../../../../services/documentViewerMode';
import { useViewerScrollerHandler } from '../../../../services/viewerScroller';
import { splittedTextByLineType } from '../lib';
import { DocumentPanelHeader } from './DocumentPanelHeader';
import { DocumentViewer } from './DocumentViewer';

export { DocumentPanel };

const TIME_THRESHOLD_FOR_UPDATE = 1 * 60 * 1000;

function DocumentPanel(props: { splittedTextByLine: splittedTextByLineType }): ReactElement {
  const theme = useCustomTheme();
  const viewerScrollerHandler = useViewerScrollerHandler();
  const annotatorStateHandler = useAnnotatorStateHandler();
  const { assignationId } = annotatorStateHandler.get();
  const annotatorStateChecksum = annotatorStateHandler.getChecksum();
  const documentViewerModeHandler = useDocumentViewerModeHandler();
  const styles = buildStyles(theme);
  const occurrenceEntityId =
    documentViewerModeHandler.documentViewerMode.kind === 'occurrence' &&
    documentViewerModeHandler.documentViewerMode.entityId;

  let updateTreatementDurationsInterval: NodeJS.Timeout | null = null;

  // Known bug: updateTreatementDurationsInterval is reset on every render, so the immediate
  // updateTreatmentDuration call below never runs. Kept as is until the treatment duration ticket is handled.
  // eslint-disable-next-line react-hooks/immutability
  useEffect(() => {
    function buildUpdateTreatmentUpdateDate(assignationId: string) {
      let lastVerticalPosition = 0;
      return async () => {
        const currentVerticalPosition = viewerScrollerHandler.getCurrentVerticalPosition();
        if (lastVerticalPosition !== currentVerticalPosition) {
          await apiCaller.post<'updateTreatmentDuration'>('updateTreatmentDuration', {
            assignationId,
          });
        } else {
          await apiCaller.post<'resetTreatmentLastUpdateDate'>('resetTreatmentLastUpdateDate', {
            assignationId,
          });
        }
        lastVerticalPosition = currentVerticalPosition;
      };
    }
    if (!assignationId) {
      return;
    }
    if (!!updateTreatementDurationsInterval) {
      clearInterval(updateTreatementDurationsInterval);
      apiCaller.post<'updateTreatmentDuration'>('updateTreatmentDuration', {
        assignationId,
      });
    }
    // eslint-disable-next-line react-hooks/immutability, react-hooks/exhaustive-deps
    updateTreatementDurationsInterval = setInterval(
      buildUpdateTreatmentUpdateDate(assignationId),
      TIME_THRESHOLD_FOR_UPDATE,
    );

    return () => {
      if (updateTreatementDurationsInterval) {
        clearInterval(updateTreatementDurationsInterval);
      }
    };
  }, [assignationId, occurrenceEntityId, annotatorStateChecksum, viewerScrollerHandler]);

  return (
    <div style={styles.panel}>
      <DocumentPanelHeader />
      <DocumentViewer splittedTextByLine={props.splittedTextByLine} />
    </div>
  );
}

function buildStyles(theme: customThemeType) {
  return {
    panel: {
      width: '100%',
      paddingRight: theme.spacing * 2,
    },
  };
}
