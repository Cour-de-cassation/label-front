import { useEffect, useEffectEvent, useState } from 'react';
import { ApiError } from 'src/api/apiCaller';

export type ApiState<dataT> =
  | { status: 'loading' }
  | { status: 'error'; statusCode: number }
  | { status: 'success'; data: dataT; isRefetching: boolean };

export function useApi<dataT, paramsT>(
  callApi: (params: paramsT) => Promise<{ data: dataT; statusCode: number }>,
  initialParams: paramsT,
) {
  const [state, setState] = useState<ApiState<dataT>>({ status: 'loading' });
  const [refetchCount, setRefetchCount] = useState<number>(0);
  const [params, setParams] = useState<paramsT>(initialParams);

  function refetch(params?: paramsT) {
    if (params) {
      setParams(params);
    }
    setState((state) => (state.status === 'success' ? { ...state, isRefetching: true } : { status: 'loading' }));
    setRefetchCount((count) => count + 1);
  }

  const fetchData = useEffectEvent((params: paramsT, isObsolete: () => boolean) => {
    callApi(params).then(
      ({ data }) => {
        if (isObsolete()) {
          return;
        }
        setState({ status: 'success', data, isRefetching: false });
      },
      (error: unknown) => {
        if (isObsolete()) {
          return;
        }
        setState({ status: 'error', statusCode: error instanceof ApiError ? error.statusCode : 500 });
      },
    );
  });

  useEffect(() => {
    let isObsolete = false;
    fetchData(params, () => isObsolete);
    return () => {
      isObsolete = true;
    };
  }, [refetchCount, params]);

  return { ...state, params, refetch };
}
