import { HiHeart } from "react-icons/hi2";

export const Favorites = () => {
  return (
    <div className="py-8 page-container">
      <div className="text-center">
        <HiHeart className="w-16 h-16 mx-auto mb-4 text-purple-600" />
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Your Favorites
        </h1>
        <p className="mb-8 text-gray-600">Save your favorite products here</p>
        <div className="text-gray-500">
          <p>No favorites yet. Start browsing to add some!</p>
        </div>
      </div>
    </div>
  );
};
