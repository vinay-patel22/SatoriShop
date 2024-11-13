import React from "react";

const AddToCartButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-purple-600 text-white px-4 py-2 rounded-md shadow hover:bg-purple-700 transition duration-200 ease-in-out mt-4"
  >
    Add to Cart
  </button>
);

export default AddToCartButton;
