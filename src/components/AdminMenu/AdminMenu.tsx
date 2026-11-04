import React from 'react';
import { customThemeType, heights, iconNameType, useCustomTheme } from 'src/pelta-design-system';
import { routes } from '../../router/routes';
import { widths } from '../../theme/layout';
import { wordings } from '../../wordings';
import { MenuIcon } from './MenuIcon';

type AdminMenuProps = { unreadProblemReportsCount: number; toBeConfirmedDocumentsCount: number };

type AdminMenuItem = {
  pathname: string;
  header: { title: string; subtitle: string };
  iconName: iconNameType;
  badge?: keyof AdminMenuProps;
};

const OFFSET_TOP = 15;

export const adminMenuItems: AdminMenuItem[] = [
  { pathname: routes.SUMMARY.getPath(), header: wordings.summaryPage.header, iconName: 'home' },
  { pathname: routes.STATISTICS.getPath(), header: wordings.statisticsPage.header, iconName: 'statistics' },
  {
    pathname: routes.UNTREATED_DOCUMENT.getPath(),
    header: wordings.untreatedDocumentsPage.header,
    iconName: 'playlistPlay',
  },
  {
    pathname: routes.TO_BE_CONFIRMED_DOCUMENTS.getPath(),
    header: wordings.toBeConfirmedDocumentsPage.header,
    iconName: 'checkBox',
    badge: 'toBeConfirmedDocumentsCount',
  },
  {
    pathname: routes.TREATED_DOCUMENTS.getPath(),
    header: wordings.treatedDocumentsPage.header,
    iconName: 'doubleCheck',
  },
  {
    pathname: routes.PROBLEM_REPORTS.getPath(),
    header: wordings.problemReportsPage.header,
    iconName: 'warning',
    badge: 'unreadProblemReportsCount',
  },
  {
    pathname: routes.PRE_ASSIGN_DOCUMENTS.getPath(),
    header: wordings.preAssignDocumentsPage.header,
    iconName: 'assignmentInd',
  },
];

export function AdminMenu(props: AdminMenuProps) {
  const theme = useCustomTheme();
  const styles = buildStyles(theme);

  return (
    <div style={styles.container}>
      <div style={styles.iconContainer}>
        {adminMenuItems.map(({ pathname, header, iconName, badge }) => (
          <MenuIcon
            key={pathname}
            title={header.subtitle}
            pathname={pathname}
            iconName={iconName}
            alertCount={badge && props[badge]}
          />
        ))}
      </div>
    </div>
  );
}

function buildStyles(theme: customThemeType) {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      width: widths.adminMenu,
      height: heights.adminPanel,
      backgroundColor: theme.colors.default.background,
    },
    iconContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      width: widths.adminMenu,
      paddingTop: OFFSET_TOP,
      backgroundColor: theme.colors.default.background,
    },
  } as const;
}
