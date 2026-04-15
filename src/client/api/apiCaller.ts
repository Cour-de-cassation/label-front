import { apiSchemaType, apiRouteInType, apiRouteOutType, networkType } from 'src/core/api';
import { urlHandler } from '../utils';
import { jwtTokenHandler } from '../services/jwtToken';

export { apiCaller };

const DEFAULT_HEADER = { 'Content-Type': 'application/json' };

function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = { ...DEFAULT_HEADER };
  const token = jwtTokenHandler.get();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

const apiCaller = {
  async get<RouteName extends keyof apiSchemaType['get']>(
    routeName: RouteName,
    args?: apiRouteInType<'get', RouteName>,
  ): Promise<{
    data: networkType<apiRouteOutType<'get', RouteName>>;
    statusCode: number;
  }> {
    const response = await fetch(
      buildUrlWithParams(
        `${urlHandler.getApiUrl()}/label/api/${routeName}`,
        args as Record<string, unknown> | undefined,
      ),
      {
        cache: 'default',
        headers: getAuthHeaders(),
        method: 'get',
        mode: 'cors',
      },
    );

    const data = (await computeDataFromResponse(response)) as networkType<apiRouteOutType<'get', RouteName>>;

    return {
      data,
      statusCode: response.status,
    };
  },

  async post<RouteName extends keyof apiSchemaType['post']>(
    routeName: RouteName,
    args?: apiRouteInType<'post', RouteName>,
  ): Promise<{
    data: networkType<apiRouteOutType<'post', RouteName>>;
    statusCode: number;
  }> {
    const response = await fetch(`${urlHandler.getApiUrl()}/label/api/${routeName}`, {
      body: args ? JSON.stringify(args) : undefined,
      cache: 'default',
      headers: getAuthHeaders(),
      method: 'post',
      mode: 'cors',
    });

    const data = (await computeDataFromResponse(response)) as networkType<apiRouteOutType<'post', RouteName>>;

    return {
      data,
      statusCode: response.status,
    };
  },
};

function buildUrlWithParams(url: string, params?: { [key: string]: unknown }) {
  const urlParameters = new URLSearchParams();

  if (params) {
    Object.entries(params).map(([key, value]) => urlParameters.append(key, JSON.stringify(value)));
    return `${url}?${urlParameters.toString()}`;
  } else {
    return url;
  }
}

async function computeDataFromResponse(response: Response): Promise<unknown> {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  /* eslint-disable @typescript-eslint/no-unsafe-return */
  if (![200, 201].includes(response.status)) {
    throw new Error(`Unknown error : ${response.status}`);
  }
  try {
    const textData = await response.text();
    try {
      const data: any = JSON.parse(textData);
      return data;
    } catch (_) {
      return textData;
    }
  } catch (error) {
    throw new Error(`Unknown error : ${response.status}`);
  }
}
