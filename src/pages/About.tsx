import { useEffect } from "react";
import { StatTile, TeamMembers, BenefitsRow, BrandStory } from "../components";

export function About() {
  useEffect(function () {
    document.title = `Exclusive | About`;
  }, []);

  return (
    <main>
      <BrandStory />
      <StatTile />
      <TeamMembers />
      <BenefitsRow />
    </main>
  );
}
