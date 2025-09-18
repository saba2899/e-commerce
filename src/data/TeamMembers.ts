import founder from "../assets/members/founder.jpg";
import director from "../assets/members/director.jpg";
import productDesigner from "../assets/members/productDesigner.jpg";
import seo from "../assets/members/Seo.jpg";
import analitycs from "../assets/members/analitycs.jpg";
import digitalMarketing from "../assets/members/digitalMarketing.jpg";
import uxDes from "../assets/members/uxDes.jpg";
import mobileDev from "../assets/members/MobileDev.jpg";
import software from "../assets/members/Software.jpg";

export type TeamMembersProps = {
  id: number;
  image: string;
  name: string;
  lastName: string;
  position: string;
};

export const TEAMMEMBERS: TeamMembersProps[] = [
  {
    id: 1,
    image: founder,
    name: "Saba",
    lastName: "Chitorelidze",
    position: "Founder & Chairman",
  },
  {
    id: 2,
    image: director,
    name: "Tako",
    lastName: "Razmadze",
    position: "Director",
  },
  {
    id: 3,
    image: productDesigner,
    name: "Lela",
    lastName: "Moniava",
    position: "Product Designer",
  },
  {
    id: 4,
    image: seo,
    name: "Nikoloz",
    lastName: "Archvadze",
    position: "SEO Specialist",
  },
  {
    id: 5,
    image: analitycs,
    name: "Nikoloz",
    lastName: "Ezieshvili",
    position: "Web Analytics Developer",
  },
  {
    id: 6,
    image: digitalMarketing,
    name: "Irakli",
    lastName: "Machaidze",
    position: "Digital Marketing Manager",
  },
  {
    id: 7,
    image: uxDes,
    name: "Nikoloz",
    lastName: "Maisuradze",
    position: "UX Designer",
  },
  {
    id: 8,
    image: mobileDev,
    name: "Tornike",
    lastName: "Keshelava",
    position: "Mobile Developer",
  },
  {
    id: 9,
    image: software,
    name: "Shota",
    lastName: "Tabatadze",
    position: "Software Developer",
  },
];
