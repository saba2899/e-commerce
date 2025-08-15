import { useState } from "react";

import { CiMenuBurger } from "react-icons/ci";

import { Logo, NavLinks, SearchBar, FavouriteButton, CartButton } from "../components";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-1000 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b">
      <div className="page-container flex items-center justify-between gap-4 py-3 md:py-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Open menu"
            className="lg:hidden p-2 rounded-md hover:bg-black/5"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <CiMenuBurger size={22} />
          </button>
          <Logo />
        </div>

        <nav className="hidden lg:block">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <SearchBar />
          <div className="flex items-center gap-2">
            <FavouriteButton />
            <CartButton />
          </div>
        </div>
      </div>

      {/* Mobile drawer (simple collapse) */}
      {menuOpen && (
        <div className="lg:hidden border-t bg-white">
          <div className="page-container py-3">
            <NavLinks vertical onNavigate={() => setMenuOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
}
