import React, { ReactElement, ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { localStorage } from '../services/localStorage';
import { wordings } from '../wordings';
import { AdminLayoutDataFetcher, useAdminBadgeCountsRefetch } from './Admin/AdminLayoutDataFetcher';
import { DocumentInspector } from './Admin/DocumentInspector';
import { TreatedDocuments } from './Admin/TreatedDocuments';
import { ProblemReports } from './Admin/ProblemReports';
import { PreAssignDocuments } from './Admin/PreAssignDocuments';
import { UntreatedDocuments } from './Admin/UntreatedDocuments';
import { ProblemReportsDataFetcher } from './Admin/ProblemReports/ProblemReportsDataFetcher';
import { PreAssignDocumentsDataFetcher } from './Admin/PreAssignDocuments/PreAssignDocumentsDataFetcher';
import { StatisticsDataFetcher } from './Admin/Statistics/StatisticsDataFetcher';
import { SummaryDataFetcher } from './Admin/Summary/SummaryDataFetcher';
import { ToBeConfirmedDocumentsDataFetcher } from './Admin/ToBeConfirmedDocuments/ToBeConfirmedDocumentsDataFetcher';
import { TreatedDocumentsDataFetcher } from './Admin/TreatedDocuments/TreatedDocumentsDataFetcher';
import { UntreatedDocumentsDataFetcher } from './Admin/UntreatedDocuments/UntreatedDocumentsDataFetcher';
import { WorkingUsersDataFetcher } from './Admin/WorkingUsers/WorkingUsersDataFetcher';
import { AnonymizedDocument } from './AnonymizedDocument';
import { Home } from './Home';
import { Login } from './Login';
import { PublishableDocuments } from './PublishableDocuments';
import { SettingsDataFetcher } from './SettingsDataFetcher';
import { Statistics } from './Admin/Statistics';
import { defaultRoutes, routes } from './routes';
import { ToBeConfirmedDocuments } from './Admin/ToBeConfirmedDocuments';
import { Summary } from './Admin/Summary';
import { CurrentUser, useCtxUser } from '../contexts/user.context';

export { Router };

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={routes.LOGIN.getPath()}
          element={
            <UnauthenticatedRoute>
              <Login />
            </UnauthenticatedRoute>
          }
        />
        <Route
          path={routes.DOCUMENT.getPath()}
          element={
            <AuthenticatedRoute>
              <SettingsDataFetcher>{({ settings }) => <DocumentInspector settings={settings} />}</SettingsDataFetcher>
            </AuthenticatedRoute>
          }
        />
        <Route
          path={routes.SUMMARY.getPath()}
          element={
            <AuthenticatedRoute>
              <AdminLayoutDataFetcher header={wordings.summaryPage.header}>
                <SummaryDataFetcher>
                  {({ summary, refetch, isLoading }) => (
                    <Summary summary={summary} refetch={refetch} isLoading={isLoading} />
                  )}
                </SummaryDataFetcher>
              </AdminLayoutDataFetcher>
            </AuthenticatedRoute>
          }
        />
        <Route
          path={routes.STATISTICS.getPath()}
          element={
            <AuthenticatedRoute>
              <AdminLayoutDataFetcher header={wordings.statisticsPage.header}>
                <WorkingUsersDataFetcher>
                  {({ workingUsers }) => (
                    <StatisticsDataFetcher>
                      {({ availableStatisticFilters, aggregatedStatistics, refetch, isLoading, ressourceFilter }) => (
                        <Statistics
                          ressourceFilter={ressourceFilter}
                          refetch={refetch}
                          isLoading={isLoading}
                          aggregatedStatistics={aggregatedStatistics}
                          availableStatisticFilters={availableStatisticFilters}
                          users={workingUsers.map(({ _id, name }) => ({ _id, name }))}
                        />
                      )}
                    </StatisticsDataFetcher>
                  )}
                </WorkingUsersDataFetcher>
              </AdminLayoutDataFetcher>
            </AuthenticatedRoute>
          }
        />
        <Route
          path={routes.PROBLEM_REPORTS.getPath()}
          element={
            <AuthenticatedRoute>
              <AdminLayoutDataFetcher header={wordings.problemReportsPage.header}>
                <ProblemReportsDataFetcher>
                  {({ problemReportsWithDetails, refetch, isLoading }) => (
                    <BadgeRefreshingChild refetch={refetch}>
                      {(combinedRefetch) => (
                        <ProblemReports
                          refetch={combinedRefetch}
                          problemReportsWithDetails={problemReportsWithDetails}
                          isLoading={isLoading}
                        />
                      )}
                    </BadgeRefreshingChild>
                  )}
                </ProblemReportsDataFetcher>
              </AdminLayoutDataFetcher>
            </AuthenticatedRoute>
          }
        />
        <Route
          path={routes.PRE_ASSIGN_DOCUMENTS.getPath()}
          element={
            <AuthenticatedRoute>
              <AdminLayoutDataFetcher header={wordings.preAssignDocumentsPage.header}>
                <WorkingUsersDataFetcher>
                  {({ workingUsers }) => (
                    <PreAssignDocumentsDataFetcher>
                      {({ preAssignations, isLoading, refetch }) => (
                        <PreAssignDocuments
                          users={workingUsers.map(({ _id, name }) => ({ _id, name }))}
                          refetch={refetch}
                          preAssignations={preAssignations}
                          isLoading={isLoading}
                        />
                      )}
                    </PreAssignDocumentsDataFetcher>
                  )}
                </WorkingUsersDataFetcher>
              </AdminLayoutDataFetcher>
            </AuthenticatedRoute>
          }
        />
        <Route
          path={routes.TO_BE_CONFIRMED_DOCUMENTS.getPath()}
          element={
            <AuthenticatedRoute>
              <AdminLayoutDataFetcher header={wordings.toBeConfirmedDocumentsPage.header}>
                <WorkingUsersDataFetcher>
                  {({ workingUsers }) => (
                    <ToBeConfirmedDocumentsDataFetcher>
                      {({ toBeConfirmedDocuments, refetch, isLoading }) => (
                        <BadgeRefreshingChild refetch={refetch}>
                          {(combinedRefetch) => (
                            <ToBeConfirmedDocuments
                              users={workingUsers.map(({ _id, name }) => ({ _id, name }))}
                              toBeConfirmedDocuments={toBeConfirmedDocuments}
                              refetch={combinedRefetch}
                              isLoading={isLoading}
                            />
                          )}
                        </BadgeRefreshingChild>
                      )}
                    </ToBeConfirmedDocumentsDataFetcher>
                  )}
                </WorkingUsersDataFetcher>
              </AdminLayoutDataFetcher>
            </AuthenticatedRoute>
          }
        />
        <Route
          path={routes.TREATED_DOCUMENTS.getPath()}
          element={
            <AuthenticatedRoute>
              <AdminLayoutDataFetcher header={wordings.treatedDocumentsPage.header}>
                <TreatedDocumentsDataFetcher>
                  {({ treatedDocuments, refetch, isLoading }) => (
                    <TreatedDocuments treatedDocuments={treatedDocuments} refetch={refetch} isLoading={isLoading} />
                  )}
                </TreatedDocumentsDataFetcher>
              </AdminLayoutDataFetcher>
            </AuthenticatedRoute>
          }
        />
        <Route
          path={routes.UNTREATED_DOCUMENT.getPath()}
          element={
            <AuthenticatedRoute>
              <AdminLayoutDataFetcher header={wordings.untreatedDocumentsPage.header}>
                <WorkingUsersDataFetcher>
                  {({ workingUsers }) => (
                    <UntreatedDocumentsDataFetcher>
                      {({ untreatedDocuments, refetch, isLoading }) => (
                        <UntreatedDocuments
                          users={workingUsers.map(({ _id, name }) => ({ _id, name }))}
                          untreatedDocuments={untreatedDocuments}
                          refetch={refetch}
                          isLoading={isLoading}
                        />
                      )}
                    </UntreatedDocumentsDataFetcher>
                  )}
                </WorkingUsersDataFetcher>
              </AdminLayoutDataFetcher>
            </AuthenticatedRoute>
          }
        />
        <Route path={routes.ANONYMIZED_DOCUMENT.getPath()} element={<AnonymizedDocument />} />
        <Route
          path={routes.PUBLISHABLE_DOCUMENTS.getPath()}
          element={
            <AuthenticatedRoute>
              <PublishableDocuments />
            </AuthenticatedRoute>
          }
        />
        <Route
          path={routes.ANNOTATION.getPath()}
          element={
            <AuthenticatedRoute>
              <SettingsDataFetcher>{({ settings }) => <Home settings={settings} />}</SettingsDataFetcher>
            </AuthenticatedRoute>
          }
        />
        <Route
          path={routes.DEFAULT.getPath()}
          element={
            <AuthenticatedRoute>
              <HomeRoute />
            </AuthenticatedRoute>
          }
        />
        <Route path="*" element={<Navigate to={routes.DEFAULT.getPath()} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function BadgeRefreshingChild(props: { refetch: () => void; children: (combinedRefetch: () => void) => ReactElement }) {
  const refetchBadges = useAdminBadgeCountsRefetch();
  const combinedRefetch = () => {
    props.refetch();
    refetchBadges();
  };
  return props.children(combinedRefetch);
}

type GuardedRouteProps = { children: ReactNode };

const AuthenticatedRoute = ({ children }: GuardedRouteProps) => {
  const { user, loading } = useCtxUser();
  if (loading) {
    return <div>Loading...</div>;
  }
  return user ? children : <Navigate to={routes.LOGIN.getPath()} replace />;
};

const HomeRoute = () => {
  const { user, loading } = useCtxUser();

  if (loading) {
    return <div>Loading...</div>;
  }
  return <Navigate to={getRedirectionRoute(user)} replace />;
};

function getRedirectionRoute(user: CurrentUser | null) {
  const userRole = user?.role;

  if (!userRole) {
    return routes.LOGIN.getPath();
  }

  if (userRole === 'admin') {
    const adminView = localStorage.adminViewHandler.get();
    if (adminView) {
      return defaultRoutes[adminView];
    }
  }

  return defaultRoutes[userRole as 'annotator' | 'scrutator' | 'admin'];
}

const UnauthenticatedRoute = ({ children }: GuardedRouteProps) => {
  const { user, loading } = useCtxUser();
  if (loading) {
    return <div>Loading...</div>;
  }
  return !user ? children : <Navigate to={routes.DEFAULT.getPath()} replace />;
};
