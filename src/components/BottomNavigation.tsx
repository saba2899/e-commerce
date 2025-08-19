import { Link, useLocation } from "react-router";
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

const BottomNavigation = () => {
  const location = useLocation();

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
    {
      name: "Login",
      path: "/login",
      icon: HiOutlineUser,
      activeIcon: HiUser,
    },
  ];

  return (
    <div className="fixed bottom-0 w-full bg-white z-1000 min-sm:hidden">
      <div className="flex items-center justify-around max-w-md px-4 py-2 mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = isActive ? item.activeIcon : item.icon;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 min-w-0 flex-1 ${
                isActive
                  ? "text-red-600 bg-red-50"
                  : "text-gray-500 hover:text-red-600 hover:bg-purple-50"
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium truncate">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
