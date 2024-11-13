import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Product from "./Product";
import SearchBar from "./SearchBar";
import FilterOptions from "./FilterOptions";
import Pagination from "./Pagination";
import useProducts from "../hooks/useProducts";
import CategoryList from "./CategoryList";

const ProductListing = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Use updated useProducts hook to handle pagination and category logic
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

  if (status === "loading")
    return <p className="text-center text-gray-700 mt-4">Loading...</p>;
  if (status === "failed")
    return <p className="text-center text-red-500 mt-4">Error: {error}</p>;

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
          Product will be updated soon...
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {paginatedItems.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>

          {/* Render Pagination if there are multiple pages */}
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
