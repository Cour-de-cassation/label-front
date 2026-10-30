import React from 'react';
import { customThemeType, useCustomTheme } from 'src/pelta-design-system';
import { Typography } from '@mui/material';
import { MainHeaderSlot } from '../../components/MainHeader/MainHeaderSlot';
import { heights } from '../../theme/layout';
import { wordings } from '../../wordings';
import { PublishableDocumentsDataFetcher } from './PublishableDocumentsDataFetcher';
import { PublishableDocumentsTable } from './PublishableDocumentsTable';

export { PublishableDocuments };

const TABLE_WIDTH = 900;

function PublishableDocuments() {
  const theme = useCustomTheme();
  const styles = buildStyles(theme);

  return (
    <>
      <MainHeaderSlot>
        <Typography>{wordings.publishableDocumentsPage.title}</Typography>
      </MainHeaderSlot>
      <div style={styles.contentContainer}>
        <PublishableDocumentsDataFetcher>
          {({ publishableDocuments, refetch }) => (
            <div style={styles.table}>
              <div style={styles.tableHeaderContainer}>
                <div style={styles.tableHeader}></div>
              </div>
              <div style={styles.tableContentContainer}>
                <PublishableDocumentsTable refetch={refetch} publishableDocuments={publishableDocuments} />
              </div>
            </div>
          )}
        </PublishableDocumentsDataFetcher>
      </div>
    </>
  );
}

function buildStyles(theme: customThemeType) {
  return {
    contentContainer: {
      display: 'flex',
      width: `${TABLE_WIDTH}px`,
      margin: '0 auto',
      height: heights.publishableDocuments,
    },
    tableHeaderContainer: {
      height: heights.publishableDocumentsTableHeader,
    },
    tableHeader: {
      paddingTop: theme.spacing * 4,
      display: 'flex',
      justifyContent: 'flex-end',
    },
    tableContentContainer: {
      height: heights.publishableDocumentsTable,
      overflowY: 'auto',
    },
    table: {
      width: '100%',
      paddingLeft: theme.spacing * 3,
      paddingRight: theme.spacing * 2,
    },
  } as const;
}
