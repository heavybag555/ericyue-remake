import { getAllProjects } from "@/sanity/queries";
import ArchiveClient from "./archive-client";

export const revalidate = 60;

export default async function ArchivePage() {
  const projectsData = await getAllProjects();
  return <ArchiveClient projectsData={projectsData} />;
}
