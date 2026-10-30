import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { ButtonWithIcon, customThemeType, Text, useCustomTheme } from 'src/pelta-design-system';
import { IconButton, Tooltip } from '@mui/material';
import { ChevronLeftRounded } from '@mui/icons-material';
import { MainHeaderSlot } from '../../components/MainHeader/MainHeaderSlot';
import { lineSplitter } from '../../services/lineSplitter';
import { heights } from '../../theme/layout';
import { wordings } from '../../wordings';
import { AnonymizedDocumentTextDataFetcher } from './AnonymizedDocumentTextDataFetcher';

export { AnonymizedDocument };

const LINE_MIN_HEIGHT = 10;
const TEXT_CONTENT_WIDTH = '900px';

function AnonymizedDocument() {
  const { documentId = '' } = useParams<'documentId'>();
  const theme = useCustomTheme();
  const styles = buildStyles(theme);

  const navigate = useNavigate();

  return (
    <>
      <MainHeaderSlot>
        <Tooltip arrow title={wordings.shared.back}>
          <IconButton color="neutral" onClick={() => navigate(-1)}>
            <ChevronLeftRounded />
          </IconButton>
        </Tooltip>
      </MainHeaderSlot>
      <AnonymizedDocumentTextDataFetcher documentId={documentId}>
        {({ anonymizedDocumentText }) => {
          const splittedTextByLine = lineSplitter.splitTextAccordingToNewLine(anonymizedDocumentText);

          return (
            <div style={styles.container}>
              <div style={styles.documentHeaderContainer}></div>
              <div style={styles.documentContainer}>
                <div style={styles.documentTextContainer}>
                  <table style={styles.documentTextTable}>
                    {splittedTextByLine.map((line, lineIndex) => (
                      <tr key={`${lineIndex + 1}-${line}`}>
                        <td style={styles.lineCell}>
                          <Text variant="body2">{line}</Text>
                        </td>
                      </tr>
                    ))}
                  </table>
                </div>
              </div>
              <div style={styles.documentFooterContainer}>
                <ButtonWithIcon
                  iconName="copy"
                  onClick={() => copyToClipboard(anonymizedDocumentText)}
                  text={wordings.shared.copyToClipboard}
                />
              </div>
            </div>
          );
        }}
      </AnonymizedDocumentTextDataFetcher>
    </>
  );
}

async function copyToClipboard(text: string) {
  await navigator.clipboard.writeText(text);
}

function buildStyles(theme: customThemeType) {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
    documentHeaderContainer: {
      height: heights.anonymizedDocumentHeader,
    },
    documentContainer: {
      width: '100vw',
      maxWidth: TEXT_CONTENT_WIDTH,
      margin: '0 auto',
    },
    documentTextContainer: {
      height: heights.anonymizedDocument,
      overflowY: 'auto',
      backgroundColor: theme.colors.document,
      borderRadius: theme.shape.borderRadius.m,
    },
    documentTextTable: {
      padding: theme.spacing * 2,
    },
    documentFooterContainer: {
      display: 'flex',
      height: heights.anonymizedDocumentFooter,
      paddingRight: theme.spacing * 2,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    lineCell: {
      height: LINE_MIN_HEIGHT,
    },
  } as const;
}
