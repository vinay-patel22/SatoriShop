import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addItem } from "../slices/cartSlice";
import AddToCartButton from "./AddToCartButton";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem(product));
    toast.success("Item added to cart!");
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <Link to={`/product/${product.id}`}>
        <div className="w-full h-64 relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col justify-between h-60">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 truncate">
            {product.description}
          </p>
        </div>
        <div className="flex items-center mb-10">
          <span className="text-xl font-bold text-gray-800">
            ${product.price.toFixed(2)}
          </span>
          <div className="ml-auto text-gray-500 text-sm">
            <span>
              Rating: {product.rating} ({product.count || 0} reviews)
            </span>
          </div>
        </div>
        <AddToCartButton onClick={handleAddToCart} />
      </div>
    </div>
  );
};

export default Product;
