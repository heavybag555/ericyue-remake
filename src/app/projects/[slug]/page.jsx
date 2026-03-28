import { getProjectBySlug } from "@/sanity/queries";
import ProjectDetailClient from "./project-detail-client";

export const revalidate = 60;

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  return <ProjectDetailClient project={project} />;
}
