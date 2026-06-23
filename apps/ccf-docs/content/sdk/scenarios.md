# SDK scenarios

These snippets assume the `counterPort` setup from the API page.

## Store-like counter

Use the SDK like a state container when the component mostly transforms state from requests.

```ts
const counterPort = definePort<{
    increment: { payload: { by: number }; responses: { changed: { count: number } } };
    reset: { payload: { reason: string }; responses: { changed: { count: number } } };
    load: { payload: { userId: string }; responses: {} };
    loaded: { payload: { count: number }; responses: { changed: { count: number } } };
  }
>("counter");

const next = counter.update(state, counterPort.request("increment", { by: 2 }));
```

The `request` value is inferred from the component's port.

## Component loop flow

Use it like a component loop when requests move the component through explicit phases.

```ts
case "counter":
  switch (request.action) {
    case "load":
      return {
        state: { ...state, loading: true },
        effects: [asyncEffect(async () => counterPort.request("loaded", { count: 42 }))],
      };
  }
```

## React-like component flow

Use it like a function component when the request is the input and the returned transition is the output.

```ts
const view = (state, request) => ({
  state,
  responses: [counterPort.response(request, "changed", { count: state.count })],
});
```

## Port-aware routing

Use separate ports when different callers reach the same component.

```ts
switch (request.port) {
  case "counter":
}
```

## Async chaining

Use dispatch when one request should trigger another request without leaving the component loop.

```ts
effects: [dispatch(counterPort.request("load", { userId: "user-123" }))]
```
