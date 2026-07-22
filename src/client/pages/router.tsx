import React, { FunctionComponent, ReactElement } from 'react';
import { BrowserRouter, Switch, Route, Redirect, RouteProps } from 'react-router-dom';
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
      <Switch>
        <UnauthenticatedRoute path={routes.LOGIN.getPath()}>
          <Login />
        </UnauthenticatedRoute>
        <AuthenticatedRoute path={routes.ADMIN.getPath()}>
          <AuthenticatedRoute path={routes.DOCUMENT.getPath()}>
            <SettingsDataFetcher>{({ settings }) => <DocumentInspector settings={settings} />}</SettingsDataFetcher>
          </AuthenticatedRoute>
          <AuthenticatedRoute path={routes.SUMMARY.getPath()}>
            <AdminLayoutDataFetcher header={wordings.summaryPage.header}>
              <SummaryDataFetcher>
                {({ summary, refetch, isLoading }) => (
                  <Summary summary={summary} refetch={refetch} isLoading={isLoading} />
                )}
              </SummaryDataFetcher>
            </AdminLayoutDataFetcher>
          </AuthenticatedRoute>
          <AuthenticatedRoute path={routes.STATISTICS.getPath()}>
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
          <AuthenticatedRoute path={routes.PROBLEM_REPORTS.getPath()}>
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
          <AuthenticatedRoute path={routes.PRE_ASSIGN_DOCUMENTS.getPath()}>
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
          <AuthenticatedRoute path={routes.TO_BE_CONFIRMED_DOCUMENTS.getPath()}>
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
          <AuthenticatedRoute path={routes.TREATED_DOCUMENTS.getPath()}>
            <AdminLayoutDataFetcher header={wordings.treatedDocumentsPage.header}>
              <TreatedDocumentsDataFetcher>
                {({ treatedDocuments, refetch, isLoading }) => (
                  <TreatedDocuments treatedDocuments={treatedDocuments} refetch={refetch} isLoading={isLoading} />
                )}
              </TreatedDocumentsDataFetcher>
            </AdminLayoutDataFetcher>
          </AuthenticatedRoute>
          <AuthenticatedRoute path={routes.UNTREATED_DOCUMENT.getPath()}>
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
        </AuthenticatedRoute>
        <Route path={routes.ANONYMIZED_DOCUMENT.getPath()}>
          <AnonymizedDocument />
        </Route>
        <AuthenticatedRoute path={routes.PUBLISHABLE_DOCUMENTS.getPath()}>
          <PublishableDocuments />
        </AuthenticatedRoute>
        <AuthenticatedRoute path={routes.ANNOTATION.getPath()}>
          <SettingsDataFetcher>{({ settings }) => <Home settings={settings} />}</SettingsDataFetcher>
        </AuthenticatedRoute>
        <AuthenticatedRoute path={routes.DEFAULT.getPath()}>
          <HomeRoute />
        </AuthenticatedRoute>
        <Redirect path="/" to={{ pathname: routes.DEFAULT.getPath() }} />
      </Switch>
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

const AuthenticatedRoute: FunctionComponent<RouteProps> = ({ children, ...rest }: RouteProps) => {
  const { user, loading } = useCtxUser();
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: routes.LOGIN.getPath(),
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const HomeRoute: FunctionComponent<RouteProps> = ({ ...props }: RouteProps) => {
  const { user, loading } = useCtxUser();

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Route
      {...props}
      render={({ location }) => (
        <Redirect
          to={{
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            pathname: getRedirectionRoute(user),
            state: { from: location },
          }}
        />
      )}
    />
  );
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

const UnauthenticatedRoute: FunctionComponent<RouteProps> = ({ children, ...rest }: RouteProps) => {
  const { user, loading } = useCtxUser();
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: routes.DEFAULT.getPath(),
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
