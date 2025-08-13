// import founder from "../assets/members/founder.webp";

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
    image: "src/assets/members/founder.jpg",
    name: "Saba",
    lastName: "Chitorelidze",
    position: "Founder & Chairman",
  },
  {
    id: 2,
    image: "src/assets/members/director.jpg",
    name: "Tako",
    lastName: "Razmadze",
    position: "Director",
  },
  {
    id: 3,
    image: "src/assets/members/productDesigner.jpg",
    name: "Lela",
    lastName: "Moniava",
    position: "Product Designer",
  },
  {
    id: 4,
    image: "src/assets/members/seo.jpg",
    name: "Nikoloz",
    lastName: "Archvadze",
    position: "SEO Specialist",
  },
  {
    id: 5,
    image: "src/assets/members/analitycs.jpg",
    name: "Nikoloz",
    lastName: "Ezieshvili",
    position: "Web Analytics Developer",
  },
  {
    id: 6,
    image: "src/assets/members/digitalMarketing.jpg",
    name: "Irakli",
    lastName: "Machaidze",
    position: "Digital Marketing Manager",
  },
  {
    id: 7,
    image: "src/assets/members/uxDes.jpg",
    name: "Nikoloz",
    lastName: "Maisuradze",
    position: "UX Designer",
  },
  {
    id: 8,
    image: "src/assets/members/mobileDev.jpg",
    name: "Tornike",
    lastName: "Keshelava",
    position: "Mobile Developer",
  },
  {
    id: 9,
    image: "src/assets/members/software.jpg",
    name: "Shota",
    lastName: "Tabatadze",
    position: "Software Developer",
  },
];
