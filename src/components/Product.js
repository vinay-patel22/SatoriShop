import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addItem } from "../slices/cartSlice";
import AddToCartButton from "./AddToCartButton";

const Product = ({ product = {} }) => {
  const dispatch = useDispatch();

  // Safely destructure product properties with defaults
  const {
    id = product._id || "unknown",
    name = product.name || product.title || "Unnamed Product",
    image = product.image ||
      product.images?.[0] ||
      "https://via.placeholder.com/150",
    description = product.description || "No description available",
    price = product.price || 0.0,
    rating = product.rating?.rate || product.rating || "No rating",
    reviewCount = product.rating?.count || 0,
  } = product;

  const handleAddToCart = () => {
    if (id && name) {
      dispatch(addItem(product));
      toast.success(`${name} added to cart!`);
    } else {
      toast.error("Unable to add item to cart. Invalid product data.");
    }
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
            onError={(e) => (e.target.src = "https://via.placeholder.com/150")} // Fallback for image error
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col justify-between h-60">
        <div>
          {/* Safely render product name and description */}
          <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
            {name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 truncate">{description}</p>
        </div>
        <div className="flex items-center mb-10">
          {/* Safely format price */}
          <span className="text-xl font-bold text-gray-800">
            ${price.toFixed(2)}
          </span>
          <div className="ml-auto text-gray-500 text-sm">
            {/* Safely display rating and review count */}
            <span>
              Rating: {typeof rating === "number" ? rating.toFixed(1) : rating}{" "}
              ({reviewCount} reviews)
            </span>
          </div>
        </div>
        <AddToCartButton onClick={handleAddToCart} />
      </div>
    </div>
  );
};

export default Product;
