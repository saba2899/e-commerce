import { CATEGORIES } from "../data/categories";

export function SideNav() {
  return (
    <aside className="hidden w-64 lg:block shrink-0">
      <nav
        aria-label="Browse categories"
        className="min-h-[360px] border-r pr-6"
      >
        <ul className="flex flex-col gap-1">
          {CATEGORIES.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="block px-4 py-3 text-sm text-gray-700 transition-colors rounded-lg hover:bg-red-50 hover:text-red-600"
              >
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
