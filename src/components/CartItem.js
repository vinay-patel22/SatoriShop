// src/components/CartItem.js
import React from "react";

const CartItem = ({ item, onRemove, onQuantityChange }) => {
  return (
    <li
      key={item.id}
      className="flex items-center mb-4 border-b border-gray-300 pb-4"
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-16 h-16 object-fill mr-4"
      />
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="text-gray-600">${item.price.toFixed(2)}</p>
        <div className="flex items-center mt-2">
          <button
            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="bg-purple-600 text-white px-2 py-1 rounded-md shadow hover:bg-purple-700 transition duration-200 ease-in-out"
          >
            -
          </button>
          <span className="mx-2">{item.quantity}</span>
          <button
            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
            className="bg-purple-600 text-white px-2 py-1 rounded-md shadow hover:bg-purple-700 transition duration-200 ease-in-out"
          >
            +
          </button>
          <button
            onClick={() => onRemove(item.id)}
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
