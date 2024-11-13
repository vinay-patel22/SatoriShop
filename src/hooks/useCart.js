// src/hooks/useCart.js
import { useDispatch, useSelector } from "react-redux";
import { adjustQuantity, clearCart, removeItem } from "../slices/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const useCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const handleRemove = useCallback(
    (id) => {
      dispatch(removeItem(id));
      toast.info("Item removed from cart");
    },
    [dispatch]
  );

  const handleQuantityChange = useCallback(
    (id, quantity) => {
      dispatch(adjustQuantity({ id, quantity }));
    },
    [dispatch]
  );

  const handleClearCart = useCallback(() => {
    dispatch(clearCart());
    toast.info("Cart cleared");
    navigate("/");
  }, [dispatch, navigate]);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return {
    cartItems,
    handleRemove,
    handleQuantityChange,
    handleClearCart,
    calculateTotal,
  };
};

export default useCart;
