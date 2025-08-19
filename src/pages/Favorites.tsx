import { HiHeart } from "react-icons/hi2";

const Favorites = () => {
  return (
    <div className="page-container py-8">
      <div className="text-center">
        <HiHeart className="w-16 h-16 text-purple-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Favorites</h1>
        <p className="text-gray-600 mb-8">Save your favorite products here</p>
        <div className="text-gray-500">
          <p>No favorites yet. Start browsing to add some!</p>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
