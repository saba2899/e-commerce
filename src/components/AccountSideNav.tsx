import { Link, useLocation } from "react-router";

export function AccountSideNav() {
  const { pathname } = useLocation();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <aside className="hidden w-64 lg:block shrink-0">
      <nav aria-label="Manage my account" className="min-h-[360px] pr-6">
        <div className="mb-6">
          <p className="mb-2 text-xs tracking-wide text-gray-500 uppercase">
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
              <span className="block px-2 py-2 text-sm text-gray-400 rounded cursor-not-allowed">
                Address Book
              </span>
            </li>
            <li>
              <span className="block px-2 py-2 text-sm text-gray-400 rounded cursor-not-allowed">
                My Payment Options
              </span>
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <p className="mb-2 text-xs tracking-wide text-gray-500 uppercase">
            My Orders
          </p>
          <ul className="space-y-1">
            <li>
              <span className="block px-2 py-2 text-sm text-gray-400 rounded cursor-not-allowed">
                My Returns
              </span>
            </li>
            <li>
              <span className="block px-2 py-2 text-sm text-gray-400 rounded cursor-not-allowed">
                My Cancellations
              </span>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-2 text-xs tracking-wide text-gray-500 uppercase">
            My Wishlist
          </p>
        </div>
      </nav>
    </aside>
  );
}
