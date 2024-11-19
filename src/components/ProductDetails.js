import React, { Suspense, lazy } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../slices/cartSlice";
import useProductDetails from "../hooks/useProductDetails";
import { toast } from "react-toastify";

// Lazy load components
const AddToCartButton = lazy(() => import("./AddToCartButton"));
const ViewCartButton = lazy(() => import("./ViewCartButton"));

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading, error, isAdded } = useProductDetails(id);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addItem(product));
      toast.success("Product added to cart");
    }
  };

  const handleViewCart = () => {
    navigate("/cart");
  };

  if (loading)
    return <div className="text-center text-gray-700">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;
  if (!product)
    return <div className="text-center text-gray-700">Product not found</div>;

  const { image, name, description, price, rating, count } = product;

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          {/* Display a single image (since it's normalized to handle both APIs) */}
          <div className="relative">
            {image ? (
              <img
                src={image}
                alt={name || "Product image"}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            ) : (
              <img
                src="#"
                alt={name || "Product image"}
                className="w-full h-auto object-fill rounded-lg shadow-lg"
              />
            )}
          </div>
        </div>
        <div className="w-full md:w-1/2 md:pl-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{name}</h1>
          <p className="text-gray-600 mb-6">{description}</p>
          <div className="mb-4">
            <span className="text-2xl font-semibold text-gray-800">
              Price: ${price.toFixed(2)}
            </span>
          </div>
          <div className="mb-6 text-gray-500 text-sm">
            <span>
              Rating: {rating || "No rating"} ({count} reviews)
            </span>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <div className="flex space-x-4">
              <AddToCartButton onClick={handleAddToCart} />
              {isAdded && <ViewCartButton onClick={handleViewCart} />}
            </div>
          </Suspense>
          <Link
            to="/"
            className="block mt-6 text-blue-600 hover:underline text-lg"
          >
            &larr; Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
