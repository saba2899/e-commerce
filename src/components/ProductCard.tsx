import { HiHeart, HiOutlineHeart, HiPlus } from "react-icons/hi2";
import { useUser } from "../context/useUser";
import { useFavorites } from "../context/favorites-context";
import { useCart } from "../context/cart-context";

interface ProductCardProps {
  id: string | number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
  isNew?: boolean;
  discount?: number;
}

export const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  isNew,
  discount,
}: ProductCardProps) => {
  const { user } = useUser();
  const { toggleFavorite, isFavorite: isFav } = useFavorites();
  const { addItem } = useCart();

  return (
    <div className="overflow-hidden transition-all duration-300 bg-white shadow-sm rounded-2xl hover:shadow-md group">
      <div className="relative overflow-hidden aspect-square bg-gray-50">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute flex flex-col gap-2 top-3 left-3">
          {isNew && (
            <span className="px-2 py-1 text-xs font-medium text-white bg-green-500 rounded-full">
              New
            </span>
          )}
          {discount && (
            <span className="px-2 py-1 text-xs font-medium text-white bg-red-500 rounded-full">
              -{discount}%
            </span>
          )}
        </div>

        <button
          onClick={() => {
            if (!user) {
              // When not logged in, do not modify global favorites
              alert("Please log in to save favorites.");
              return;
            }
            toggleFavorite(id);
          }}
          className="absolute p-2 transition-colors duration-200 rounded-full top-3 right-3 bg-white/90 backdrop-blur-sm hover:bg-white"
        >
          {user && isFav(id) ? (
            <HiHeart className="w-5 h-5 text-red-500" />
          ) : (
            <HiOutlineHeart className="w-5 h-5 text-gray-600" />
          )}
        </button>

        <div className="absolute transition-opacity duration-300 opacity-0 bottom-3 left-3 right-3 group-hover:opacity-100">
          <button
            onClick={() => {
              if (!user) {
                // This component doesn't have LoginModal; rely on global flow
                alert("Please log in to add items to the cart.");
                return;
              }
              addItem({ id: name, title: name, price, image, description: "", category: "", rating: { rate: 0, count: 0 } } as any, 1);
            }}
            className="flex items-center justify-center w-full gap-2 px-4 py-2 font-medium text-white transition-colors duration-200 bg-purple-600 hover:bg-purple-700 rounded-xl"
          >
            <HiPlus className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>

      <div className="p-4">
        {category && (
          <p className="mb-1 text-xs tracking-wide text-gray-500 uppercase">
            {category}
          </p>
        )}

        <h3 className="mb-2 text-sm font-medium leading-5 text-gray-900 line-clamp-2">
          {name}
        </h3>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-purple-600">${price}</span>
          {originalPrice && originalPrice > price && (
            <span className="text-sm text-gray-500 line-through">
              ${originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
