import { createImageUrlBuilder } from "@sanity/image-url";
import { projectId, dataset } from "./env";

let _builder = null;

function getBuilder() {
  if (!_builder) {
    if (!projectId || projectId === "YOUR_PROJECT_ID") return null;
    _builder = createImageUrlBuilder({ projectId, dataset });
  }
  return _builder;
}

export function urlFor(source) {
  const builder = getBuilder();
  if (!builder) return { url: () => undefined };
  return builder.image(source);
}
