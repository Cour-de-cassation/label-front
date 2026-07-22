import React, { ReactElement, createContext, useContext } from 'react';
import { apiRouteOutType } from 'src/core';
import { apiCaller, useApi } from '../../api';
import { DataFetcher } from '../DataFetcher';
import { AdminPage } from './AdminPage';
import { CurrentUser, useCtxUser } from '../../contexts/user.context';
import { localStorage } from '../../services/localStorage';

export { AdminLayoutDataFetcher, useAdminBadgeCountsRefetch };

type badgeCountsType = apiRouteOutType<'get', 'adminBadgeCounts'>;

const AdminBadgeCountsRefetchContext = createContext<() => void>(() => undefined);

function useAdminBadgeCountsRefetch() {
  return useContext(AdminBadgeCountsRefetchContext);
}

function AdminLayoutDataFetcher(props: { header: { title: string; subtitle: string }; children: ReactElement }) {
  const { user } = useCtxUser();
  const badgeCountsFetchInfo = useApi(fetchAdminBadgeCounts, {});

  const userRole = getUserRole(user);
  if (userRole !== 'admin' && userRole !== 'scrutator') {
    return <></>;
  }

  return (
    <DataFetcher
      buildComponentWithData={(badgeCounts: badgeCountsType) => (
        <AdminBadgeCountsRefetchContext.Provider value={badgeCountsFetchInfo.refetch}>
          <AdminPage
            userRole={userRole}
            header={props.header}
            unreadProblemReportsCount={badgeCounts.unreadProblemReportsCount}
            toBeConfirmedDocumentsCount={badgeCounts.toBeConfirmedDocumentsCount}
          >
            {props.children}
          </AdminPage>
        </AdminBadgeCountsRefetchContext.Provider>
      )}
      fetchInfo={badgeCountsFetchInfo}
      route={'adminBadgeCounts'}
    />
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
