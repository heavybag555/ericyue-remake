import { createClient } from "@sanity/client";
import { projectId, dataset, apiVersion } from "./env";

let _client = null;

export function getClient() {
  if (!_client) {
    if (!projectId || projectId === "YOUR_PROJECT_ID") {
      throw new Error(
        "[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Add it to your environment variables."
      );
    }
    _client = createClient({ projectId, dataset, apiVersion, useCdn: true });
  }
  return _client;
}

export const client = new Proxy(
  {},
  {
    get(_, prop) {
      return getClient()[prop];
    },
  }
);
