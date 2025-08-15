import { NavLink } from "react-router";

type Item = { label: string; route: string };

const NAV: Item[] = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Contact",
    route: "/contact",
  },
  {
    label: "About",
    route: "/about",
  },
  {
    label: "Sign up",
    route: "/singup",
  },
];

export function NavLinks({
  vertical = false,
  onNavigate,
}: {
  vertical?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <ul
      className={vertical ? "flex flex-col gap-3" : "flex items-center gap-8"}
    >
      {NAV.map((item) => (
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
