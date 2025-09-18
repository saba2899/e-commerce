import { useNavigate } from "react-router";
import { HiOutlineUser } from "react-icons/hi2";

export function LoginIcon() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <button
      type="button"
      aria-label="Login"
      onClick={handleClick}
      className="relative p-2 cursor-pointer rounded-md hover:bg-black/5 transition-colors"
    >
      <HiOutlineUser size={22} className="text-gray-600 hover:text-red-600" />
    </button>
  );
}
