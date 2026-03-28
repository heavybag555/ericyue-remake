import { getHeroProjects } from "@/sanity/queries";
import HomeClient from "./home-client";

export const revalidate = 60;

export default async function Home() {
  const heroData = await getHeroProjects();
  return <HomeClient heroData={heroData} />;
}
