import { createClient } from "@sanity/client";
import { projectId, dataset, apiVersion } from "./env";

let _client = null;

export function getClient() {
  if (!_client) {
    if (!projectId || projectId === "YOUR_PROJECT_ID") {
      return null;
    }
    _client = createClient({ projectId, dataset, apiVersion, useCdn: true });
  }
  return _client;
}
