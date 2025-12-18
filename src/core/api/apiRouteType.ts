// import { buildType, idType } from '../modules';
import { ObjectId } from 'bson';
import { ApiSchema, apiSchemaMethodNameType } from './apiSchema';

export type { apiRouteInType, apiRouteOutType, networkType };

type apiRouteInType<
  methodNameT extends apiSchemaMethodNameType,
  routeNameT extends keyof ApiSchema[methodNameT],
> = Pick<ApiSchema[methodNameT], routeNameT>[routeNameT] extends {
  in: { [argName: string]: any };
}
  ? {
    [argName in keyof Pick<ApiSchema[methodNameT], routeNameT>[routeNameT]['in']]:
    Pick<ApiSchema[methodNameT], routeNameT>[routeNameT]['in'][argName]
    ;
  }
  : undefined;

type apiRouteOutType<
  methodNameT extends apiSchemaMethodNameType,
  routeNameT extends keyof ApiSchema[methodNameT],
> = Pick<ApiSchema[methodNameT], routeNameT>[routeNameT] extends {
  out: any;
}
  ? Pick<ApiSchema[methodNameT], routeNameT>[routeNameT]['out']
  : never;

type networkType<T> = T extends { [key: string]: unknown }
  ? { [key in keyof T]: networkType<T[key]> }
  : T extends Array<unknown>
  ? Array<networkType<T[0]>>
  : T extends ObjectId
  ? string
  : T extends Date
  ? string
  : T;
