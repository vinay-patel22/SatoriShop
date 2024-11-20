import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { adjustQuantity } from "../slices/cartSlice";

const OrderSummary = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(adjustQuantity({ id, quantity }));
    }
  };

  return (
    <div className="order-summary bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li key={item.id} className="flex items-center border-b py-4">
            <img
              src={item.image}
              alt={item.title}
              className="w-16 h-16 object-cover rounded mr-4"
            />
            <div className="flex-1 flex justify-between">
              <div className="flex-1">
                <span className="block font-semibold">{item.title}</span>
                <span className="text-gray-600">
                  Quantity:
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    className="mx-2 px-2 py-1 bg-gray-200 text-gray-700 rounded"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  {item.quantity}
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    className="mx-2 px-2 py-1 bg-gray-200 text-gray-700 rounded"
                  >
                    +
                  </button>
                </span>
              </div>
              <span className="font-bold">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between font-bold mt-4 border-t pt-4">
        <span>Total:</span>
        <span>${calculateTotal().toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
