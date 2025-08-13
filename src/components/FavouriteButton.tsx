import { CiHeart } from "react-icons/ci";

export default function FavouriteButton() {
  return (
    <button
      type="button"
      aria-label="Wishlist"
      className="hidden lg:block relative p-2 rounded:md  hover:bg-black/5"
    >
      <CiHeart size={22} />
    </button>
  );
}
