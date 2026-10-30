import React, { createContext, use, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Box, Typography } from '@mui/material';
import { apiRouteOutType } from 'src/core';
import { apiCaller, useApi } from '../../api';
import { AdminMenu, adminMenuItems } from '../AdminMenu/AdminMenu';
import { MainHeaderSlot } from '../MainHeader/MainHeaderSlot';
import { CurrentUser, useCtxUser } from '../../contexts/user.context';
import { localStorage } from '../../services/localStorage';
import { heights } from '../../theme/layout';
import { DataFetcher } from '../../pages/DataFetcher';

type badgeCountsType = apiRouteOutType<'get', 'adminBadgeCounts'>;

const AdminBadgeCountsRefetchContext = createContext<() => void>(() => undefined);

export function useAdminBadgeCountsRefetch() {
  return use(AdminBadgeCountsRefetchContext);
}

export function AdminLayout() {
  const { user } = useCtxUser();
  const { pathname } = useLocation();
  const badgeCountsFetchInfo = useApi(fetchAdminBadgeCounts, {});
  const [badgeCountsPathname, setBadgeCountsPathname] = useState(pathname);

  if (pathname !== badgeCountsPathname) {
    setBadgeCountsPathname(pathname);
    badgeCountsFetchInfo.refetch();
  }

  const userRole = getUserRole(user);
  if (userRole !== 'admin' && userRole !== 'scrutator') {
    return <></>;
  }

  const currentHeader = adminMenuItems.find((item) => item.pathname === pathname)?.header;

  return (
    <>
      {currentHeader && (
        <MainHeaderSlot>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h3">{currentHeader.title}</Typography>
            <Typography>{currentHeader.subtitle}</Typography>
          </Box>
        </MainHeaderSlot>
      )}
      <DataFetcher
        buildComponentWithData={(badgeCounts: badgeCountsType) => (
          <AdminBadgeCountsRefetchContext value={badgeCountsFetchInfo.refetch}>
            <Box sx={{ display: 'flex', width: '100vw', height: heights.adminPanel }}>
              <AdminMenu
                unreadProblemReportsCount={badgeCounts.unreadProblemReportsCount}
                toBeConfirmedDocumentsCount={badgeCounts.toBeConfirmedDocumentsCount}
              />
              <Outlet />
            </Box>
          </AdminBadgeCountsRefetchContext>
        )}
        fetchInfo={badgeCountsFetchInfo}
        route={'adminBadgeCounts'}
      />
    </>
  );
}

async function fetchAdminBadgeCounts() {
  const { data, statusCode } = await apiCaller.get('adminBadgeCounts');
  return { data, statusCode };
}

function getUserRole(user: CurrentUser | null): 'admin' | 'scrutator' | undefined {
  const stored = localStorage.adminViewHandler.get();
  const role = stored || user?.role;
  if (role === 'admin' || role === 'scrutator') {
    return role;
  }
  return undefined;
}
