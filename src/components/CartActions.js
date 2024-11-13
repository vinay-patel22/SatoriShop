import React from "react";

const CartActions = ({ total, onClearCart, onCheckout }) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <span className="text-xl font-bold">Total: ${total.toFixed(2)}</span>
      <div>
        <button
          onClick={onClearCart}
          className="bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-700 transition duration-200 ease-in-out"
        >
          Clear Cart
        </button>
        <button
          onClick={onCheckout}
          className="ml-4 bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition duration-200 ease-in-out"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartActions;
