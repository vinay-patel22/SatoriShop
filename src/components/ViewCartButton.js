import React from "react";

const ViewCartButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition duration-200 ease-in-out mt-4"
  >
    View My Cart
  </button>
);

export default ViewCartButton;
