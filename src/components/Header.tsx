import { useState } from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import FavouriteButton from "./FavouriteButton";
import CartButton from "./CartButton";
import MobileSidebar from "./MobileSidebar";
import AccountIcon from "./AccountIcon";
import { useUser } from "../hooks/useUser";
import { Burger } from "./Burger";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  return (
    <>
      <header className="sticky max-sm:w-full  top-0 z-[1000] bg-white/90 backdrop-blur border-b p-2">
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
