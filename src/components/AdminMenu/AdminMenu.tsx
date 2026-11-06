import React from 'react';
import { NavLink } from 'react-router';
import { Badge, Box, ButtonBase, SxProps, Theme, Tooltip } from '@mui/material';
import {
  AssignmentIndRounded,
  BarChart,
  CheckBoxRounded,
  DoneAllRounded,
  HomeRounded,
  PlaylistPlayRounded,
  ReportProblemRounded,
  SvgIconComponent,
} from '@mui/icons-material';
import { apiRouteOutType } from 'src/core';
import { routes } from 'src/router/routes';
import { widths } from 'src/theme/layout';
import { wordings } from 'src/wordings';

type AdminMenuProps = {
  unreadProblemReportsCount: number;
  toBeConfirmedDocumentsCount: number;
};

type AdminMenuPage = {
  pathname: string;
  header: { title: string; subtitle: string };
  Icon: SvgIconComponent;
  badge?: keyof apiRouteOutType<'get', 'adminBadgeCounts'>;
};

export const adminMenuPages: AdminMenuPage[] = [
  { pathname: routes.SUMMARY.getPath(), header: wordings.summaryPage.header, Icon: HomeRounded },
  { pathname: routes.STATISTICS.getPath(), header: wordings.statisticsPage.header, Icon: BarChart },
  {
    pathname: routes.UNTREATED_DOCUMENT.getPath(),
    header: wordings.untreatedDocumentsPage.header,
    Icon: PlaylistPlayRounded,
  },
  {
    pathname: routes.TO_BE_CONFIRMED_DOCUMENTS.getPath(),
    header: wordings.toBeConfirmedDocumentsPage.header,
    Icon: CheckBoxRounded,
    badge: 'toBeConfirmedDocumentsCount',
  },
  {
    pathname: routes.TREATED_DOCUMENTS.getPath(),
    header: wordings.treatedDocumentsPage.header,
    Icon: DoneAllRounded,
  },
  {
    pathname: routes.PROBLEM_REPORTS.getPath(),
    header: wordings.problemReportsPage.header,
    Icon: ReportProblemRounded,
    badge: 'unreadProblemReportsCount',
  },
  {
    pathname: routes.PRE_ASSIGN_DOCUMENTS.getPath(),
    header: wordings.preAssignDocumentsPage.header,
    Icon: AssignmentIndRounded,
  },
];

const TAB_HEIGHT = 50;
const CORNER_SIZE = 5;

const menuSx: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '15px',
  flexShrink: 0,
  width: widths.adminMenu,
  pt: '20px',
  bgcolor: 'neutral.main',
};

const tabSx: SxProps<Theme> = (theme) => ({
  position: 'relative',
  width: `calc(${widths.adminMenu} - ${theme.spacing(1)})`,
  height: TAB_HEIGHT,
  borderTopLeftRadius: TAB_HEIGHT / 2,
  borderBottomLeftRadius: TAB_HEIGHT / 2,
  color: 'text.secondary',
  '&.active': {
    color: 'text.primary',
    bgcolor: 'background.default',
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      right: 0,
      width: CORNER_SIZE,
      height: CORNER_SIZE,
    },
    '&::before': {
      top: -CORNER_SIZE,
      background: `radial-gradient(circle at top left, transparent ${CORNER_SIZE}px, ${theme.palette.background.default} ${CORNER_SIZE}px)`,
    },
    '&::after': {
      bottom: -CORNER_SIZE,
      background: `radial-gradient(circle at bottom left, transparent ${CORNER_SIZE}px, ${theme.palette.background.default} ${CORNER_SIZE}px)`,
    },
  },
});

export function AdminMenu(props: AdminMenuProps) {
  return (
    <Box sx={menuSx}>
      {adminMenuPages.map(({ pathname, header, Icon, badge }) => (
        <Tooltip key={pathname} title={header.subtitle} placement="right">
          <ButtonBase component={NavLink} to={pathname} end replace sx={tabSx}>
            <Badge badgeContent={badge && props[badge]} color="error">
              <Icon sx={{ fontSize: 28 }} />
            </Badge>
          </ButtonBase>
        </Tooltip>
      ))}
    </Box>
  );
}
