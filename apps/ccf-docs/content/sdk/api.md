# SDK API

The SDK centers on a single component loop:

- a component receives a request
- it reads state
- it returns new state
- it can emit responses tied to the originating request
- it can schedule async work as follow-up requests
- a port can expose multiple request actions
- immutability is a usage convention, not a typed constraint

## Main idea

```ts
import { asyncEffect, defineComponent, definePort, dispatch } from "@furo9/ccf-sdk";

const counterPort = definePort<{
    increment: {
      payload: { by: number };
      responses: { changed: { count: number } };
    };
    reset: {
      payload: { reason: string };
      responses: { changed: { count: number } };
    };
    load: {
      payload: { userId: string };
      responses: {};
    };
    loaded: {
      payload: { count: number };
      responses: { changed: { count: number } };
    };
  }
>("counter");

export const counter = defineComponent({
  name: "counter",
  port: counterPort,
  init: () => ({ count: 0 }),
  update(state, request) {
    return { state: { ...state, count: state.count + 1 } };
  },
});
```

The component uses the port definition to infer the request and response types.

## Port-aware requests

Each request carries a `port` field and an `action` field so the component knows exactly where it came from and what it is asking for.

When a port exposes multiple actions, the same component implements all of them.

Responses are created from the request they answer, and the request defines which response actions are valid.

```ts
switch (request.port) {
  case "counter":
    switch (request.action) {
      case "increment":
        return { state: { ...state, count: state.count + request.payload.by } };
    }
}
```

## Async work

Async work stays in the same request pipeline:

```ts
effects: [asyncEffect(async () => counterPort.request("loaded", { count: 42 }))]
```

## Central dispatch

When a request should stay in the same request pipeline, use `dispatch`.

```ts
effects: [dispatch(counterPort.request("load", { userId: "user-1" }))]
```

## Split package setup

The port contract can live in one package while the component implementation lives in another.

See the `Split package` page for the package-by-package shape.
