import { useState } from "react";

import { CiHeart } from "react-icons/ci";

import { useUser } from "../hooks/useUser";

import { LoginModal } from "../components";

export function FavouriteButton() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  function handleClick() {
    if (!user) {
      setOpen(true);
      return;
    }
  }

  return (
    <>
      <button
        type="button"
        aria-label="Wishlist"
        onClick={handleClick}
        className="relative hidden p-2 cursor-pointer lg:block rounded:md hover:bg-black/5"
      >
        <CiHeart size={22} />
      </button>
      <LoginModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
