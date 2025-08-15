import { type CategoryItem } from "../MOCK/CATEGORIES_MOCK";
import { BiChevronRight } from "react-icons/bi";

export type SideNavProps = {
  list: CategoryItem[],
}
export function SideNav({ list }: SideNavProps) {
  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <nav
        aria-label="Browse categories"
        className="min-h-[360px] border-r pr-6"
      >
        <ul className="flex flex-col">
          {list.map(({ label, href, hasChildren }) => (
            <li key={label}>
              <a
                href={href}
                className=" group flex items-center justify-between gap-3
                  py-2.5 pl-2 pr-1 rounded
                  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/10
                  text-sm"
              >
                <span>{label}</span>
                {hasChildren ? (
                  <BiChevronRight
                    size={18}
                    className="opacity-60 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                ) : (
                  <span className="w-4" aria-hidden="true" />
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
