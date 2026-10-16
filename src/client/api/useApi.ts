import { useEffect, useState } from 'react';

export { useApi };

function useApi<dataT, paramsT>(
  callApi: (params: paramsT) => Promise<{ data: dataT; statusCode: number }>,
  initialParams: paramsT,
) {
  const [data, setData] = useState<dataT | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [statusCode, setStatusCode] = useState<number | undefined>(undefined);
  const [refetchFlag, setRefetchFlag] = useState<boolean>(false);
  const [params, setParams] = useState<paramsT>(initialParams);

  useEffect(() => {
    callApi(params).then(
      ({ data, statusCode }) => {
        setData(data);
        setIsLoaded(true);
        setStatusCode(statusCode);
      },
      (error) => {
        setIsLoaded(true);
        //TODO clean the unsafe member access
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (error.statusCode) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          setStatusCode(error.statusCode);
        } else {
          setStatusCode(500);
        }
      },
    );
    // callApi is recreated on every render by the callers: adding it would refetch in a loop.
    // TODO: use useEffectEvent once on React 19.2+
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchFlag, params]);

  return { data, params, isLoaded, refetch, statusCode };

  function refetch(params?: paramsT) {
    if (params) {
      setParams(params);
    }
    setIsLoaded(false);
    setStatusCode(undefined);
    setRefetchFlag(!refetchFlag);
  }
}
