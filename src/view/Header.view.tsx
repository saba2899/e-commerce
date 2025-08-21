import { useState } from "react";

import { useUser } from "../hooks/useUser";
import {
  Logo,
  NavLinks,
  SearchBar,
  FavouriteButton,
  CartButton,
  MobileSidebar,
  AccountIcon,
  Burger,
} from "../components";

export function Header() {
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  return (
    <>
      <header className="fixed w-screen top-0 z-[10000] p-2 border-b max-sm:w-full bg-white/90 backdrop-blur">
        <div className="flex items-center justify-between gap-4 py-4 page-container">
          <div className="flex items-center gap-3">
            <div className="md:hidden">
              <Burger isOpen={open} onClick={() => setOpen((v) => !v)} />
            </div>

            <Logo />
          </div>

          <nav className="hidden lg:block">
            <NavLinks user={user} />
          </nav>

          <div className="flex items-center gap-3 md:gap-4 max-sm:hidden">
            <SearchBar />
            <FavouriteButton />
            <CartButton />
            {user && <AccountIcon />}
          </div>
        </div>
      </header>

      <MobileSidebar isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
