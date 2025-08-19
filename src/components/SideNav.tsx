import { CATEGORIES } from "../data/categories";

export default function SideNav() {
  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <nav
        aria-label="Browse categories"
        className="min-h-[360px] border-r pr-6"
      >
        <ul className="flex flex-col gap-1">
          {CATEGORIES.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="block py-3 px-4 rounded-lg text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
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
