import { createRequestId, type PortMeta, type PortName } from "./shared.js";

export type PortRequestDefinition<
  Payload,
  Responses extends Record<string, unknown> = Record<string, never>,
> = {
  payload: Payload;
  responses: Responses;
};

export type PortContract = Record<string, PortRequestDefinition<any, any>>;

export type PortRequest<
  Port extends PortName,
  Action extends string,
  Payload,
> = {
  kind: "request";
  port: Port;
  action: Action;
  requestId: string;
  correlationId?: string;
  payload: Payload;
};

export type PortResponse<
  Port extends PortName,
  RequestAction extends string,
  Action extends string,
  Payload,
> = {
  kind: "response";
  port: Port;
  requestAction: RequestAction;
  action: Action;
  requestId: string;
  correlationId: string;
  payload: Payload;
};

export type PortRequestUnion<
  Name extends PortName,
  Contract extends PortContract,
> = {
  [Action in keyof Contract & string]: PortRequest<Name, Action, Contract[Action]["payload"]>;
}[keyof Contract & string];

export type PortResponseUnion<
  Name extends PortName,
  Contract extends PortContract,
> = {
  [RequestAction in keyof Contract & string]: {
    [Action in keyof Contract[RequestAction]["responses"] & string]: PortResponse<
      Name,
      RequestAction,
      Action,
      Contract[RequestAction]["responses"][Action]
    >;
  }[keyof Contract[RequestAction]["responses"] & string];
}[keyof Contract & string];

export type PortDefinition<Name extends PortName, Contract extends PortContract = PortContract> = {
  name: Name;
  request: <Action extends keyof Contract & string>(
    action: Action,
    payload: Contract[Action]["payload"],
    meta?: PortMeta,
  ) => PortRequest<Name, Action, Contract[Action]["payload"]>;
  response: <RequestAction extends keyof Contract & string, Action extends keyof Contract[RequestAction]["responses"] & string>(
    request: PortRequest<Name, RequestAction, Contract[RequestAction]["payload"]>,
    action: Action,
    payload: Contract[RequestAction]["responses"][Action],
    meta?: PortMeta,
  ) => PortResponse<Name, RequestAction, Action, Contract[RequestAction]["responses"][Action]>;
};

export type PortRequestFromDefinition<Port extends PortDefinition<any, any>> =
  Port extends PortDefinition<infer Name, infer Contract>
    ? PortRequestUnion<Name, Contract>
    : never;

export type PortResponseFromDefinition<Port extends PortDefinition<any, any>> =
  Port extends PortDefinition<infer Name, infer Contract>
    ? PortResponseUnion<Name, Contract>
    : never;

export function definePort<
  Contract extends PortContract = PortContract,
  Name extends PortName = PortName,
>(name: Name): PortDefinition<Name, Contract> {
  return {
    name,
    request<Action extends keyof Contract & string>(
      action: Action,
      payload: Contract[Action]["payload"],
      meta: PortMeta = {},
    ) {
      return {
        kind: "request",
        port: name,
        action,
        requestId: meta.requestId ?? createRequestId(),
        correlationId: meta.correlationId,
        payload,
      };
    },
    response<RequestAction extends keyof Contract & string, Action extends keyof Contract[RequestAction]["responses"] & string>(
      request: PortRequest<Name, RequestAction, Contract[RequestAction]["payload"]>,
      action: Action,
      payload: Contract[RequestAction]["responses"][Action],
      meta: PortMeta = {},
    ) {
      return {
        kind: "response",
        port: name,
        requestAction: request.action,
        action,
        requestId: meta.requestId ?? createRequestId(),
        correlationId: meta.correlationId ?? request.requestId,
        payload,
      };
    },
  };
}
