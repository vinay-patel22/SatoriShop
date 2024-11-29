import React, { useState } from "react";
import Product from "./Product";
import SearchBar from "./SearchBar";
import FilterOptions from "./FilterOptions";
import Pagination from "./Pagination";
import useProducts from "../hooks/useProducts";
import CategoryList from "./CategoryList";

const LOADING_MESSAGE = "Loading...";
const ERROR_MESSAGE = "Error: ";

const ProductListing = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const {
    items,
    filteredItems,
    status,
    error,
    query,
    hasSearched,
    currentPage,
    paginatedItems,
    totalPages,
    handleSearch,
    handleSort,
    handleReset,
    handlePageChange,
  } = useProducts(selectedCategory);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center mt-4">
        {/* Consider adding a spinner component here */}
        <p className="text-center text-gray-700">{LOADING_MESSAGE}</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="text-center mt-4">
        <p className="text-red-500">
          {ERROR_MESSAGE} {error}
        </p>
        <button
          onClick={() => handleReset()}
          className="mt-2 text-blue-600 underline"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="p-2 m-2 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <SearchBar onSearch={handleSearch} suggestions={items} />
          <FilterOptions onSort={handleSort} onReset={handleReset} />
        </div>
        <CategoryList onCategorySelect={setSelectedCategory} />
      </div>

      {filteredItems.length === 0 && hasSearched ? (
        <p className="text-center text-gray-500 mt-4">
          No products available...
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {paginatedItems?.map((product) => (
              <Product key={product?.id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </>
  );
};

export default ProductListing;
