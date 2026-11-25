import React from 'react';
import { customThemeType, useCustomTheme } from 'src/pelta-design-system';
import { heights } from '../../theme/layout';
import { DocumentNumberTextInput } from '../DocumentNumberTextInput';
import { StatisticsFilterButton } from 'src/components/Statistics/StatisticsFilterButton';
import { apiRouteOutType } from 'src/api/apiRouteType';
import { ressourceFilterType } from 'src/types/ressourceFilter';
import { userType } from 'src/types/user';

export { DocumentsTableHeaderStatistics };

function DocumentsTableHeaderStatistics(props: {
  availableStatisticFilters: apiRouteOutType<'get', 'availableStatisticFilters'>;
  users: Pick<userType, '_id' | 'name'>[];
  refetch: (ressourceFilter: ressourceFilterType) => void;
  isLoading: boolean;
  ressourceFilter: ressourceFilterType;
  setSearchedDocumentNumber: (documentNumber: number | undefined) => void;
  documentNumber: number | undefined;
}) {
  const theme = useCustomTheme();
  const styles = buildStyles(theme);

  return (
    <div style={styles.tableHeaderContainer}>
      <div style={styles.tableHeader}>
        <StatisticsFilterButton
          availableStatisticFilters={props.availableStatisticFilters}
          users={props.users}
          refetch={props.refetch}
          isLoading={props.isLoading}
          ressourceFilter={props.ressourceFilter}
        />
        <div style={styles.tableRightHeader}>
          <div style={styles.searchTextInputContainer}>
            <DocumentNumberTextInput value={props.documentNumber} onChange={props.setSearchedDocumentNumber} />
          </div>
        </div>
      </div>
    </div>
  );
}

function buildStyles(theme: customThemeType) {
  return {
    tableHeaderContainer: {
      height: heights.adminTreatmentsTableHeader,
    },
    tableHeader: {
      paddingTop: theme.spacing * 4,
      paddingRight: theme.spacing * 2,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    tableRightHeader: {
      display: 'flex',
    },
    searchTextInputContainer: {
      marginRight: theme.spacing * 2,
    },
  } as const;
}
