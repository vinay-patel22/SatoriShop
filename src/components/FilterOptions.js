import React from "react";
import { FaSortAmountDown, FaSortAmountUp, FaUndo } from "react-icons/fa";

const FilterOptions = ({ onSort, onReset }) => {
  const buttonClass =
    "flex items-center px-3 py-1 rounded-md shadow-sm transition duration-200 ease-in-out text-sm";

  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200 mb-6">
      <div className="flex space-x-2">
        <button
          onClick={() => onSort("asc")}
          className={`${buttonClass} bg-blue-600 text-white hover:bg-blue-700`}
        >
          <FaSortAmountUp className="mr-2 text-lg" />
          Sort by Price: Low to High
        </button>
        <button
          onClick={() => onSort("desc")}
          className={`${buttonClass} bg-blue-600 text-white hover:bg-blue-700`}
        >
          <FaSortAmountDown className="mr-2 text-lg" />
          Sort by Price: High to Low
        </button>
        <button
          onClick={onReset}
          className={`${buttonClass} bg-gray-600 text-white hover:bg-gray-700`}
        >
          <FaUndo className="mr-2 text-lg" />
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterOptions;
