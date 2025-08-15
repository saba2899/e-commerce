import { FiTwitter } from "react-icons/fi";
import type { TeamMembersProps } from "../MOCK/TEAM_MEMBERS";
import { FaInstagram } from "react-icons/fa";
import { GrLinkedinOption } from "react-icons/gr";

type TeamCardProps = {
  card: TeamMembersProps;
};

export default function TeamCard({ card }: TeamCardProps) {
  return (
    <article className="page-container flex flex-col justify-center  w-[280px] max-w-full ">
      <div>
        <img
          className="h-76 w-56"
          src={card.image}
          alt={`${card.name} ${card.lastName}`}
        />
      </div>
      <div className="flex gap-2">
        <h3 className="font-semibold">{card.name}</h3>
        <h3 className="font-semibold">{card.lastName}</h3>
      </div>
      <div>
        <p className="text-sm">{card.position}</p>
      </div>
      <nav className="flex gap-3 mt-2">
        <a href="#">
          <FiTwitter />
        </a>
        <a href="#">
          <FaInstagram />
        </a>
        <a href="#">
          <GrLinkedinOption />
        </a>
      </nav>
    </article>
  );
}
