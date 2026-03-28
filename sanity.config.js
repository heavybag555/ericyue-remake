"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemas";
import { projectId, dataset } from "./src/sanity/env";

export default defineConfig({
  name: "giovanni-sotomayor",
  title: "Giovanni Sotomayor Portfolio",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
