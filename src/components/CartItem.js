import React from "react";

const CartItem = ({ item, onRemove, onQuantityChange }) => {
  // Destructure and safely access properties with defaults
  const {
    id,
    image = "",
    title = "Unknown Product",
    price = 0,
    quantity = 1,
  } = item || {};

  return (
    <li
      key={id}
      className="flex items-center mb-4 border-b border-gray-300 pb-4"
    >
      {/* Safely render the image */}
      <img
        src={image || "https://via.placeholder.com/64"} // Fallback to placeholder image
        alt={title}
        className="w-16 h-16 object-fill mr-4"
      />
      <div className="flex-grow">
        {/* Safely render the title */}
        <h3 className="text-lg font-semibold">{title}</h3>
        {/* Format price safely */}
        <p className="text-gray-600">${price.toFixed(2)}</p>
        <div className="flex items-center mt-2">
          {/* Decrease Quantity Button */}
          <button
            onClick={() => onQuantityChange?.(id, quantity - 1)} // Optional chaining for callback
            disabled={quantity <= 1} // Disable if quantity is 1 or less
            className="bg-purple-600 text-white px-2 py-1 rounded-md shadow hover:bg-purple-700 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            -
          </button>
          {/* Quantity Display */}
          <span className="mx-2">{quantity}</span>
          {/* Increase Quantity Button */}
          <button
            onClick={() => onQuantityChange?.(id, quantity + 1)} // Optional chaining for callback
            className="bg-purple-600 text-white px-2 py-1 rounded-md shadow hover:bg-purple-700 transition duration-200 ease-in-out"
          >
            +
          </button>
          {/* Remove Button */}
          <button
            onClick={() => onRemove?.(id)} // Optional chaining for callback
            className="ml-4 bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-700 transition duration-200 ease-in-out"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
