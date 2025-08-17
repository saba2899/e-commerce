import { NavLink } from "react-router";
import type { PublicUser } from "../services/auth";

type Item = { label: string; route: string };

const NAV: Item[] = [
  { label: "Home", route: "/" },
  { label: "Contact", route: "/contact" },
  { label: "About", route: "/about" },
  { label: "Sign up", route: "/singup" },
];

export default function NavLinks({
  vertical = false,
  onNavigate,
  user,
}: {
  vertical?: boolean;
  onNavigate?: () => void;
  user?: PublicUser | null;
}) {
  return (
    <ul
      className={vertical ? "flex flex-col gap-3" : "flex items-center gap-8"}
    >
      {NAV.filter((item) => !(item.label === "Sign up" && user)).map((item) => (
        <li key={item.label}>
          <NavLink
            to={item.route}
            className={({ isActive }) =>
              isActive ? " underline font-semibold" : "header-link"
            }
            onClick={onNavigate}
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
