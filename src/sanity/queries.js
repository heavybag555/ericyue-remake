import { getClient } from "./client";
import { urlFor } from "./image";
import { projectId, dataset } from "./env";

const PROJECT_FIELDS = `
  _id,
  projectId,
  index,
  sortOrder,
  title,
  author,
  category,
  camera,
  filmStock,
  coverImage,
  galleryImages,
  video
`;

function isSanityConfigured() {
  return projectId && projectId !== "YOUR_PROJECT_ID";
}

async function safeFetch(query, params) {
  if (!isSanityConfigured()) {
    console.warn("[sanity] Project ID not configured — returning empty data. Set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
    return [];
  }
  const client = getClient();
  if (!client) {
    console.warn("[sanity] Client could not be created — returning empty data.");
    return [];
  }
  try {
    return await client.fetch(query, params);
  } catch (err) {
    console.error("[sanity] Fetch failed:", err.message);
    return [];
  }
}

function mapProject(doc) {
  if (!doc) return null;

  const img = doc.coverImage ? urlFor(doc.coverImage).url() : undefined;

  const images =
    doc.galleryImages && doc.galleryImages.length > 0
      ? doc.galleryImages.map((g) => urlFor(g).url())
      : [];

  const video =
    doc.video?.asset?._ref
      ? `https://cdn.sanity.io/files/${projectId}/${dataset}/${doc.video.asset._ref.replace("file-", "").replace(/-(?=[^-]*$)/, ".")}`
      : undefined;

  return {
    id: doc.projectId,
    index: doc.index,
    title: doc.title,
    author: doc.author || undefined,
    category: doc.category,
    camera: doc.camera || undefined,
    filmStock: doc.filmStock || undefined,
    img,
    images,
    video,
  };
}

export async function getAllProjects() {
  const docs = await safeFetch(
    `*[_type == "project"] | order(sortOrder asc) { ${PROJECT_FIELDS} }`
  );
  return docs.map(mapProject).filter(Boolean);
}

export async function getHeroProjects() {
  const docs = await safeFetch(
    `*[_type == "project" && index != "ARCHIVE"] | order(sortOrder asc) { ${PROJECT_FIELDS} }`
  );
  return docs.map(mapProject).filter(Boolean);
}

export async function getProjectBySlug(slug) {
  if (!isSanityConfigured()) {
    console.warn("[sanity] Project ID not configured — returning null.");
    return null;
  }
  const client = getClient();
  if (!client) return null;
  try {
    const doc = await client.fetch(
      `*[_type == "project" && projectId == $slug][0] { ${PROJECT_FIELDS} }`,
      { slug }
    );
    return mapProject(doc);
  } catch (err) {
    console.error("[sanity] Fetch failed:", err.message);
    return null;
  }
}

export async function getCategories() {
  const result = await safeFetch(
    `array::unique(*[_type == "project"].category)`
  );
  return result;
}
