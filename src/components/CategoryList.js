import React from "react";
import useCategories from "../hooks/useCategories";
import { FaThLarge } from "react-icons/fa";
import { GiClothes, GiDiamondRing, GiSmartphone } from "react-icons/gi";

const CategoryList = ({ onCategorySelect }) => {
  const { categories, loading, error } = useCategories();

  const categoryIcons = {
    "men's clothing": <GiClothes className="inline-block mr-2 text-xl" />,
    "women's clothing": <GiClothes className="inline-block mr-2 text-xl" />,
    electronics: <GiSmartphone className="inline-block mr-2 text-xl" />,
    jewelery: <GiDiamondRing className="inline-block mr-2 text-xl" />,
  };

  if (loading) {
    return <p className="text-center text-blue-500">Loading categories...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        Error loading categories: {error}
      </p>
    );
  }

  return (
    <div className="mb-8 bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
        Explore Categories
      </h2>
      <div className="flex flex-wrap justify-center">
        <button
          onClick={() => onCategorySelect(null)}
          className="flex items-center px-5 py-3 border rounded-full mr-4 mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 shadow-lg transform transition-all duration-300 hover:scale-105"
        >
          <FaThLarge className="inline-block mr-2 text-xl" />
          All Products
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategorySelect(category)}
            className="flex items-center px-5 py-3 border rounded-full mr-4 mb-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold hover:from-green-500 hover:to-blue-600 shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            {categoryIcons[category] || (
              <FaThLarge className="inline-block mr-2 text-xl" />
            )}
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
