import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-6">
      <nav>
        <ul className="flex list-style-none">
          {[...Array(totalPages).keys()].map((pageNumber) => (
            <li key={pageNumber + 1} className="mx-1">
              <button
                onClick={() => onPageChange(pageNumber + 1)}
                className={`px-4 py-2 border rounded ${
                  currentPage === pageNumber + 1
                    ? "bg-purple-600 text-white"
                    : "bg-white text-purple-600"
                }`}
              >
                {pageNumber + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
