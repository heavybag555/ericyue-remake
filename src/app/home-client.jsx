"use client";

import HeroProject from "@/components/hero-projects/hero-projects";

const HomeClient = ({ heroData }) => {
  return (
    <main className="pt-[var(--pageInsetTop)] pb-[var(--footerReserve)]">
      <div className="flex flex-col">
        {heroData.map((project, i) => (
          <HeroProject key={project.id || project.index} project={project} index={i} />
        ))}
        <div className="h-screen" />
      </div>
    </main>
  );
};

export default HomeClient;
