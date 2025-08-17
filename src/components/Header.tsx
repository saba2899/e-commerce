import { useState } from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import FavouriteButton from "./FavouriteButton";
import CartButton from "./CartButton";
import { CiMenuBurger } from "react-icons/ci";
import AccountIcon from "./AccountIcon";
import { useUser } from "../hooks/useUser";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useUser();

  return (
    <header className="sticky top-0 z-1000 bg-white/90 backdrop-blur border-b">
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
          <NavLinks user={user} />
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <SearchBar />
          <div className="flex items-center gap-2">
            <FavouriteButton />
            <CartButton />
            {user && <AccountIcon />}
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t bg-white">
          <div className="page-container py-3">
            <NavLinks
              user={user}
              vertical
              onNavigate={() => setMenuOpen(false)}
            />
          </div>
        </div>
      )}
    </header>
  );
}
