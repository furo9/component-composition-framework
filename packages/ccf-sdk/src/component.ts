import type {
  PortDefinition,
  PortRequestFromDefinition,
  PortResponseFromDefinition,
} from "./port.js";

export type DispatchEffect<Request> = {
  kind: "dispatch";
  request: Request;
};

export type AsyncEffect<Request> = {
  kind: "async";
  run: () => Promise<Request>;
};

export type Effect<Request> = DispatchEffect<Request> | AsyncEffect<Request>;

export type Transition<State, Response, Request> = {
  state: State;
  responses?: Response[];
  effects?: Effect<Request>[];
};

export type ComponentDefinition<
  State,
  Port extends PortDefinition<any, any>,
  InitInput = void,
> = {
  name: string;
  port: Port;
  init: (input?: InitInput) => State;
  update: (
    state: State,
    request: PortRequestFromDefinition<Port>,
  ) => Transition<
    State,
    PortResponseFromDefinition<Port>,
    PortRequestFromDefinition<Port>
  >;
};

export function dispatch<Request>(request: Request): DispatchEffect<Request> {
  return { kind: "dispatch", request };
}

export function asyncEffect<Request>(run: () => Promise<Request>): AsyncEffect<Request> {
  return { kind: "async", run };
}

export function defineComponent<State, Port extends PortDefinition<any, any>, InitInput = void>(
  definition: ComponentDefinition<State, Port, InitInput>,
): ComponentDefinition<State, Port, InitInput> {
  return definition;
}
