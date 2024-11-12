import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { adjustQuantity, clearCart, removeItem } from "../slices/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "./Header";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const handleRemove = (id) => {
    dispatch(removeItem(id));
    toast.info("Item removed from cart");
  };

  const handleQuantityChange = (id, quantity) => {
    dispatch(adjustQuantity({ id, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.info("Cart cleared");
    navigate("/");
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

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
      <div className="container mx-auto p-4 ">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        <ul>
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="flex items-center mb-4 border-b border-gray-300 pb-4"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-fil mr-4"
              />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                    className="bg-purple-600 text-white px-2 py-1 rounded-md shadow hover:bg-purple-700 transition duration-200 ease-in-out"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    className="bg-purple-600 text-white px-2 py-1 rounded-md shadow hover:bg-purple-700 transition duration-200 ease-in-out"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="ml-4 bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-700 transition duration-200 ease-in-out"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold">
            Total: ${calculateTotal().toFixed(2)}
          </span>
          <div>
            <button
              onClick={handleClearCart}
              className="bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-700 transition duration-200 ease-in-out"
            >
              Clear Cart
            </button>
            <button
              onClick={() =>
                toast.info("Checkout functionality not implemented")
              }
              className="ml-4 bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition duration-200 ease-in-out"
            >
              Checkout
            </button>
          </div>
        </div>
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
