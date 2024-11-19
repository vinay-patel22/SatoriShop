import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addItem } from "../slices/cartSlice";
import AddToCartButton from "./AddToCartButton";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const id = product.id || product._id;
  const name = product.name || product.title;
  const image = product.image || product.images?.[0];
  const description = product.description || "No description available";
  const price = product.price || 0.0;
  const rating = product.rating?.rate || product.rating || "No rating";
  const reviewCount = product.rating?.count || 0;

  const handleAddToCart = () => {
    dispatch(addItem(product));
    toast.success("Item added to cart!");
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      {/* Link to product details using flexible ID */}
      <Link to={`/product/${id}`}>
        <div className="w-full h-64 relative">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain"
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col justify-between h-60">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
            {name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 truncate">{description}</p>
        </div>
        <div className="flex items-center mb-10">
          <span className="text-xl font-bold text-gray-800">
            ${price.toFixed(2)}
          </span>
          <div className="ml-auto text-gray-500 text-sm">
            <span>
              Rating: {rating} ({reviewCount} reviews)
            </span>
          </div>
        </div>
        <AddToCartButton onClick={handleAddToCart} />
      </div>
    </div>
  );
};

export default Product;
