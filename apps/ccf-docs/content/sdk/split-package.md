# Split package

This pattern keeps the port contract in one package and the component implementation in another.

## Port package

The port package owns the request and response shapes.

```ts
// examples/counter-port/src/index.ts
export const counterPort = definePort<CounterPortContract>("counter");
```

## Component package

The component package imports the port contract and uses it for request typing and response creation.

```ts
// examples/counter-component/src/counter.ts
import { counterPort } from "@furo9/ccf-example-counter-port";

export const counterComponent = defineComponent({
  name: "counter",
  port: counterPort,
  update(state, request) {
    switch (request.action) {
      case "increment":
        return {
          state: { ...state, count: state.count + request.payload.by },
          responses: [counterPort.response(request, "changed", { count: state.count + request.payload.by })],
        };
    }
  },
});
```

The component package only imports the port object. The SDK derives request and response typing from that port when the component is defined.

The response helper receives the originating request, so each response stays attached to the request that produced it.

## Why this is useful

- The port contract becomes reusable
- Component code only depends on typed contract data
- A different component package can implement the same port later
- Requests, responses, and actions stay aligned across packages
- The contract can stay plain JavaScript-friendly while immutability remains a usage rule
