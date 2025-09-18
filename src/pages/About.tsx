import { useEffect } from "react";
import {
  StatTile,
  TeamMembers,
  BenefitsRow,
  BrandStory,
  MobileAboutLayout,
} from "../components";

export function About() {
  useEffect(function () {
    document.title = `Exclusive | About`;
  }, []);

  return (
    <>
      {/* Mobile Layout */}
      <div className="sm:hidden">
        <MobileAboutLayout />
      </div>

      {/* Desktop Layout */}
      <main className="hidden sm:block">
        <BrandStory />
        <StatTile />
        <TeamMembers />
        <BenefitsRow />
      </main>
    </>
  );
}
