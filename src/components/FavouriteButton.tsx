import { useState } from "react";
import { useNavigate } from "react-router";

import { CiHeart } from "react-icons/ci";

import { useUser } from "../context/useUser";
import { useFavorites } from "../context/favorites-context";

import { LoginModal } from "../components";

export function FavouriteButton() {
  const { user } = useUser();
  const { count } = useFavorites();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function handleClick() {
    if (!user) {
      setOpen(true);
      return;
    }
    navigate("/favorites");
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
        {count > 0 && (
          <span className="absolute -right-1 -top-1 min-w-5 h-5 rounded-full bg-red-500 text-white text-[10px] leading-5 text-center px-1">
            {count}
          </span>
        )}
      </button>
      <LoginModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
