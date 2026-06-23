import {
  definePort,
} from "@furo9/ccf-sdk";

type CounterPortContract = {
  increment: {
    payload: { by: number };
    responses: {
      changed: { count: number };
    };
  };
  reset: {
    payload: { reason: string };
    responses: {
      changed: { count: number };
    };
  };
  load: {
    payload: { userId: string };
    responses: {};
  };
  loaded: {
    payload: { count: number };
    responses: {
      changed: { count: number };
    };
  };
};

export const counterPort = definePort<CounterPortContract>("counter");
