import { useEffect, useEffectEvent, useState } from 'react';
import { ApiError } from 'src/api/apiCaller';

export function useApi<dataT, paramsT>(
  callApi: (params: paramsT) => Promise<{ data: dataT; statusCode: number }>,
  initialParams: paramsT,
) {
  const [data, setData] = useState<dataT | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [statusCode, setStatusCode] = useState<number | undefined>(undefined);
  const [refetchCount, setRefetchCount] = useState<number>(0);
  const [params, setParams] = useState<paramsT>(initialParams);

  function refetch(params?: paramsT) {
    if (params) {
      setParams(params);
    }
    setIsLoaded(false);
    setStatusCode(undefined);
    setRefetchCount((count) => count + 1);
  }

  const fetchData = useEffectEvent((params: paramsT, isObsolete: () => boolean) => {
    callApi(params).then(
      ({ data, statusCode }) => {
        if (isObsolete()) {
          return;
        }
        setData(data);
        setIsLoaded(true);
        setStatusCode(statusCode);
      },
      (error: unknown) => {
        if (isObsolete()) {
          return;
        }
        setIsLoaded(true);
        setStatusCode(error instanceof ApiError ? error.statusCode : 500);
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

  return { data, params, isLoaded, refetch, statusCode };
}
