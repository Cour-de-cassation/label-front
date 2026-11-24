import React, { ReactElement } from 'react';
import { ApiState } from 'src/api/useApi';
import { ErrorPage } from './ErrorPage';
import { LoadingPage } from './LoadingPage';

export function DataFetcher<dataT>(props: {
  buildComponentWithData: (returnedData: dataT) => ReactElement;
  fetchInfo: ApiState<dataT>;
  showLoadingOnRefetch?: boolean;
  route?: string;
}) {
  const { fetchInfo } = props;

  switch (fetchInfo.status) {
    case 'loading':
      return <LoadingPage />;
    case 'error':
      return <ErrorPage route={props.route} errorCode={fetchInfo.statusCode} />;
    case 'success':
      if (fetchInfo.isRefetching && props.showLoadingOnRefetch) {
        return <LoadingPage />;
      }
      return props.buildComponentWithData(fetchInfo.data);
  }
}
