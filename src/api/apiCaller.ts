import { apiRouteInType, apiRouteOutType, networkType } from 'src/api/apiRouteType';
import { apiSchemaType } from 'src/api/apiSchema';
import { urlHandler } from '../utils';
import { jwtTokenHandler } from '../services/jwtToken';

const DEFAULT_HEADER = { 'Content-Type': 'application/json' };

export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number) {
    super(`Unknown error : ${statusCode}`);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = { ...DEFAULT_HEADER };
  const token = jwtTokenHandler.get();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export const apiCaller = {
  get<RouteName extends keyof apiSchemaType['get']>(routeName: RouteName, args?: apiRouteInType<'get', RouteName>) {
    return request<networkType<apiRouteOutType<'get', RouteName>>>(
      buildUrlWithParams(buildRouteUrl(routeName), args as Record<string, unknown> | undefined),
      { method: 'get' },
    );
  },

  post<RouteName extends keyof apiSchemaType['post']>(routeName: RouteName, args?: apiRouteInType<'post', RouteName>) {
    return request<networkType<apiRouteOutType<'post', RouteName>>>(buildRouteUrl(routeName), {
      body: args ? JSON.stringify(args) : undefined,
      method: 'post',
    });
  },
};

async function request<dataT>(url: string, init: RequestInit): Promise<{ data: dataT; statusCode: number }> {
  const response = await fetch(url, {
    ...init,
    cache: 'default',
    headers: getAuthHeaders(),
    mode: 'cors',
  });

  const data = (await computeDataFromResponse(response)) as dataT;

  return {
    data,
    statusCode: response.status,
  };
}

function buildRouteUrl(routeName: string) {
  return `${urlHandler.getApiUrl()}/label/api/${routeName}`;
}

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
  if (![200, 201].includes(response.status)) {
    throw new ApiError(response.status);
  }
  try {
    const textData = await response.text();
    try {
      return JSON.parse(textData);
    } catch {
      return textData;
    }
  } catch {
    throw new Error(`Unknown error : ${response.status}`);
  }
}
