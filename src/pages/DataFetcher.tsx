import React, { ReactElement } from 'react';
import { ApiState } from 'src/api/useApi';
import { ErrorState } from 'src/components/ErrorState';
import { LoadingState } from 'src/components/LoadingState';

export function DataFetcher<dataT>(props: {
  buildComponentWithData: (returnedData: dataT) => ReactElement;
  fetchInfo: ApiState<dataT>;
  showLoadingOnRefetch?: boolean;
  route?: string;
}) {
  const { fetchInfo } = props;

  switch (fetchInfo.status) {
    case 'loading':
      return <LoadingState />;
    case 'error':
      return <ErrorState route={props.route} errorCode={fetchInfo.statusCode} />;
    case 'success':
      if (fetchInfo.isRefetching && props.showLoadingOnRefetch) {
        return <LoadingState />;
      }
      return props.buildComponentWithData(fetchInfo.data);
  }
}
