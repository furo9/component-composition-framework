import { counterPort } from "@furo9/ccf-example-counter-port";
import { counterComponent } from "./counter.js";

export function runIncrementScenario() {
  const state = counterComponent.init();
  return counterComponent.update(state, counterPort.request("increment", { by: 2 }));
}

export function runLoadScenario() {
  const state = counterComponent.init();
  return counterComponent.update(state, counterPort.request("load", { userId: "user-123" }));
}

export function runResetScenario() {
  const state = counterComponent.init();
  return counterComponent.update(state, counterPort.request("reset", { reason: "manual" }));
}
