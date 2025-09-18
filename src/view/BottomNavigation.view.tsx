import { Link, useLocation } from "react-router";
import { useState } from "react";
import {
  HiHome,
  HiOutlineHome,
  HiHeart,
  HiOutlineHeart,
  HiMagnifyingGlass,
  HiOutlineMagnifyingGlass,
  HiShoppingBag,
  HiOutlineShoppingBag,
} from "react-icons/hi2";
import { useCart } from "../context/cart-context";
import { useFavorites } from "../context/favorites-context";
import { MobileSearchModal } from "../components";

export const BottomNavigation = () => {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const { count: cartCount } = useCart();
  const { count: favoritesCount } = useFavorites();

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: HiOutlineHome,
      activeIcon: HiHome,
    },
    {
      name: "Search",
      path: "#",
      icon: HiOutlineMagnifyingGlass,
      activeIcon: HiMagnifyingGlass,
      isButton: true,
      onClick: () => setSearchOpen(true),
    },
    {
      name: "Favorites",
      path: "/favorites",
      icon: HiOutlineHeart,
      activeIcon: HiHeart,
      count: favoritesCount,
    },
    {
      name: "Cart",
      path: "/cart",
      icon: HiOutlineShoppingBag,
      activeIcon: HiShoppingBag,
      count: cartCount,
    },
  ];

  return (
    <div className="fixed bottom-0 w-full bg-white z-[1000] min-sm:hidden">
      <div className="flex items-center justify-around max-w-md px-4 py-2 mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = isActive ? item.activeIcon : item.icon;

          const commonClasses = `flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 min-w-0 flex-1 relative ${
            isActive
              ? "text-red-600 bg-red-50"
              : "text-gray-500 hover:text-red-600 hover:bg-purple-50"
          }`;

          if (item.isButton) {
            return (
              <button
                key={item.name}
                type="button"
                onClick={item.onClick}
                className={commonClasses}
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium truncate">
                  {item.name}
                </span>
              </button>
            );
          }

          return (
            <Link key={item.name} to={item.path} className={commonClasses}>
              <div className="relative">
                <Icon className="w-6 h-6 mb-1" />
                {item.count && item.count > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {item.count > 99 ? "99+" : item.count}
                  </div>
                )}
              </div>
              <span className="text-xs font-medium truncate">{item.name}</span>
            </Link>
          );
        })}
      </div>

      <MobileSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </div>
  );
};
