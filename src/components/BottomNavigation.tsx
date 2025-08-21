import { Link, useLocation } from "react-router";
import { useState } from "react";
import {
  HiHome,
  HiOutlineHome,
  HiPhone,
  HiOutlinePhone,
  HiHeart,
  HiOutlineHeart,
  HiUser,
  HiOutlineUser,
} from "react-icons/hi2";
import { useUser } from "../hooks/useUser";
import MobileAccountSheet from "./MobileAccountSheet";

const BottomNavigation = () => {
  const location = useLocation();
  const [accountOpen, setAccountOpen] = useState(false);
  const { user } = useUser();

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: HiOutlineHome,
      activeIcon: HiHome,
    },
    {
      name: "Contact",
      path: "/contact",
      icon: HiOutlinePhone,
      activeIcon: HiPhone,
    },
    {
      name: "Favorites",
      path: "/favorites",
      icon: HiOutlineHeart,
      activeIcon: HiHeart,
    },
    user
      ? {
          name: "Profile",
          path: "/profile",
          icon: HiOutlineUser,
          activeIcon: HiUser,
        }
      : {
          name: "Login",
          path: "/login",
          icon: HiOutlineUser,
          activeIcon: HiUser,
        },
  ];

  return (
    <div className="fixed bottom-0 w-full bg-white z-[1000] min-sm:hidden">
      <div className="flex items-center justify-around max-w-md px-4 py-2 mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = isActive ? item.activeIcon : item.icon;

          const commonClasses = `flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 min-w-0 flex-1 ${
            isActive
              ? "text-red-600 bg-red-50"
              : "text-gray-500 hover:text-red-600 hover:bg-purple-50"
          }`;

          if (user && item.name === "Profile") {
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => setAccountOpen((v) => !v)}
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
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium truncate">{item.name}</span>
            </Link>
          );
        })}
      </div>
      {user && (
        <MobileAccountSheet
          isOpen={accountOpen}
          onClose={() => setAccountOpen(false)}
        />
      )}
    </div>
  );
};

export default BottomNavigation;
