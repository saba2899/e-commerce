import { useState } from "react";

import { useUser } from "../context/useUser";
import {
  Logo,
  NavLinks,
  SearchBar,
  FavouriteButton,
  CartButton,
  MobileSidebar,
  AccountIcon,
  LoginIcon,
  Burger,
} from "../components";

export function Header() {
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  return (
    <>
      <header className="fixed w-screen top-0 z-[10000] p-2 border-b max-sm:w-full bg-white/90 backdrop-blur">
        <div className="flex items-center py-4 page-container">
          {/* Mobile: Burger menu, Desktop: Logo */}
          <div className="flex items-center flex-shrink-0 gap-3">
            <div className="md:hidden">
              <Burger isOpen={open} onClick={() => setOpen((v) => !v)} />
            </div>
            <div className="hidden md:block">
              <Logo />
            </div>
          </div>

          {/* Mobile: Center Logo */}
          <div className="flex justify-center flex-1 md:hidden">
            <Logo />
          </div>

          {/* Desktop navigation - Absolutely centered */}
          <nav className="absolute hidden transform -translate-x-1/5 lg:block left-1/3">
            <NavLinks user={user} />
          </nav>

          {/* Right side - Actions */}
          <div className="flex items-center flex-shrink-0 gap-3 ml-auto md:gap-4">
            {/* Desktop actions */}
            <div className="items-center hidden gap-3 sm:flex md:gap-4">
              <SearchBar />
              <FavouriteButton />
              <CartButton />
              {user ? <AccountIcon /> : <LoginIcon />}
            </div>

            {/* Mobile actions */}
            <div className="flex items-center gap-2 sm:hidden">
              <CartButton />
              {user ? <AccountIcon /> : <LoginIcon />}
            </div>
          </div>
        </div>
      </header>

      <MobileSidebar isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
