type DataFetchStatus<dataT> = { kind: 'loading' } | { kind: 'error' } | { kind: 'data'; data: dataT };

export function handleFetchedData<dataT>(
  fetchInfo: { isLoaded: boolean; statusCode?: number; data?: dataT },
  showLoadingOnRefetch?: boolean,
): DataFetchStatus<dataT> {
  if (!fetchInfo.isLoaded && (showLoadingOnRefetch || !fetchInfo.data)) {
    return { kind: 'loading' };
  }

  const isSuccess = fetchInfo.statusCode === undefined || [200, 201].includes(fetchInfo.statusCode);

  if (isSuccess && fetchInfo.data) {
    return { kind: 'data', data: fetchInfo.data };
  }

  return { kind: 'error' };
}
