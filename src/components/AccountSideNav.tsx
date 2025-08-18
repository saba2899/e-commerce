import { Link, useLocation } from "react-router";

export default function AccountSideNav() {
  const { pathname } = useLocation();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <nav aria-label="Manage my account" className="min-h-[360px] pr-6">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
            Manage My Account
          </p>
          <ul className="space-y-1">
            <li>
              <Link
                to="/profile"
                className={
                  isActive("/profile")
                    ? "block rounded px-2 py-2 text-sm bg-red-50 text-red-600"
                    : "block rounded px-2 py-2 text-sm hover:bg-gray-50"
                }
              >
                My Profile
              </Link>
            </li>
            <li>
              <span className="block rounded px-2 py-2 text-sm text-gray-400 cursor-not-allowed">
                Address Book
              </span>
            </li>
            <li>
              <span className="block rounded px-2 py-2 text-sm text-gray-400 cursor-not-allowed">
                My Payment Options
              </span>
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
            My Orders
          </p>
          <ul className="space-y-1">
            <li>
              <span className="block rounded px-2 py-2 text-sm text-gray-400 cursor-not-allowed">
                My Returns
              </span>
            </li>
            <li>
              <span className="block rounded px-2 py-2 text-sm text-gray-400 cursor-not-allowed">
                My Cancellations
              </span>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
            My Wishlist
          </p>
        </div>
      </nav>
    </aside>
  );
}
