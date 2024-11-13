import React from "react";
import { FaSortAmountDown, FaSortAmountUp, FaUndo } from "react-icons/fa";

const FilterOptions = ({ onSort, onReset }) => {
  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200 mb-6">
      <div className="flex space-x-2">
        <button
          onClick={() => onSort("asc")}
          className="flex items-center bg-blue-600 text-white px-3 py-1 rounded-md shadow-sm hover:bg-blue-700 transition duration-200 ease-in-out text-sm"
        >
          <FaSortAmountUp className="mr-2 text-lg" /> {/* Smaller icon */}
          Sort by Price: Low to High
        </button>
        <button
          onClick={() => onSort("desc")}
          className="flex items-center bg-blue-600 text-white px-3 py-1 rounded-md shadow-sm hover:bg-blue-700 transition duration-200 ease-in-out text-sm"
        >
          <FaSortAmountDown className="mr-2 text-lg" /> {/* Smaller icon */}
          Sort by Price: High to Low
        </button>
        <button
          onClick={onReset}
          className="flex items-center bg-gray-600 text-white px-3 py-1 rounded-md shadow-sm hover:bg-gray-700 transition duration-200 ease-in-out text-sm"
        >
          <FaUndo className="mr-2 text-lg" /> {/* Smaller icon */}
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterOptions;
