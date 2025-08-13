import BenefitsRow from "../components/BenefitsRow";
import BrandStory from "../components/BrandStory";
import StatTile from "../components/StatTile";
import TeamMembers from "../components/TeamMembers";

export default function About() {
  return (
    <main>
      <BrandStory />
      <StatTile />
      <TeamMembers />
      <BenefitsRow />
    </main>
  );
}
