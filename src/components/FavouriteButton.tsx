import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { useUser } from "../hooks/useUser";
import LoginModal from "./LoginModal";

export default function FavouriteButton() {
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
        className="hidden lg:block cursor-pointer relative p-2 rounded:md hover:bg-black/5"
      >
        <CiHeart size={22} />
      </button>
      <LoginModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
