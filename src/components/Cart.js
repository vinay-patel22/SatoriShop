import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import useCart from "../hooks/useCart";
import CartItem from "./CartItem";
import CartActions from "./CartActions";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    handleRemove,
    handleQuantityChange,
    handleClearCart,
    calculateTotal,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-xl font-bold text-gray-700">Your cart is empty</p>
        <Link
          to="/"
          className="mt-4 inline-block bg-purple-600 text-white px-4 py-2 rounded-md shadow hover:bg-purple-700 transition duration-200 ease-in-out"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        <ul>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={handleRemove}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </ul>
        <CartActions
          total={calculateTotal()}
          onClearCart={handleClearCart}
          onCheckout={() => navigate("/checkout")}
        />
        <Link
          to="/"
          className="mt-4 inline-block bg-purple-600 text-white px-4 py-2 rounded-md shadow hover:bg-purple-700 transition duration-200 ease-in-out"
        >
          Continue Shopping
        </Link>
      </div>
    </>
  );
};

export default Cart;
