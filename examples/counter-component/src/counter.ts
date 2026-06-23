import { asyncEffect, defineComponent } from "@furo9/ccf-sdk";
import { counterPort } from "@furo9/ccf-example-counter-port";

type CounterState = {
  count: number;
  loading: boolean;
  lastAction: string | null;
};

export const counterComponent = defineComponent({
  name: "counter",
  port: counterPort,
  init: (): CounterState => ({ count: 0, loading: false, lastAction: null }),
  update(state, request) {
    switch (request.action) {
      case "increment": {
        const count = state.count + request.payload.by;
        return {
          state: { ...state, count, lastAction: request.action },
          responses: [counterPort.response(request, "changed", { count })],
        };
      }
      case "reset": {
        const count = 0;
        return {
          state: { ...state, count, lastAction: request.action },
          responses: [counterPort.response(request, "changed", { count })],
        };
      }
      case "load": {
        return {
          state: { ...state, loading: true, lastAction: request.action },
          effects: [
            asyncEffect(async () => {
              const count = await fetchUserCount(request.payload.userId);
              return counterPort.request("loaded", { count }, { correlationId: request.requestId });
            }),
          ],
        };
      }
      case "loaded": {
        return {
          state: { ...state, loading: false, count: request.payload.count, lastAction: request.action },
          responses: [counterPort.response(request, "changed", { count: request.payload.count })],
        };
      }
      default:
        throw new Error("Unknown counter action");
    }
  },
});

async function fetchUserCount(userId: string): Promise<number> {
  return userId.length * 10;
}
