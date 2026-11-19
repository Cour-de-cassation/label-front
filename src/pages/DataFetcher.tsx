import React, { ReactElement } from 'react';
import { handleFetchedData } from '../api';
import { ErrorPage } from './ErrorPage';
import { LoadingPage } from './LoadingPage';

export function DataFetcher<dataT>(props: {
  buildComponentWithData: (returnedData: dataT) => ReactElement;
  fetchInfo: { isLoaded: boolean; statusCode?: number; data?: dataT };
  showLoadingOnRefetch?: boolean;
  route?: string;
}) {
  const fetchedData = handleFetchedData(props.fetchInfo, props.showLoadingOnRefetch);

  switch (fetchedData.kind) {
    case 'loading':
      return <LoadingPage />;
    case 'data':
      return props.buildComponentWithData(fetchedData.data);
    case 'error':
      return <ErrorPage route={props.route} errorCode={props.fetchInfo.statusCode} />;
  }
}
