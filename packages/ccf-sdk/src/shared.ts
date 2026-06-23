export type RequestId = string;
export type PortName = string;

export type PortMeta = {
  requestId?: RequestId;
  correlationId?: RequestId;
};

export function createRequestId(): RequestId {
  const crypto = globalThis.crypto;
  if (crypto && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `req_${Math.random().toString(36).slice(2)}_${Date.now().toString(36)}`;
}
