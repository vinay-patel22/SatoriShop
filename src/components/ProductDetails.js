import React, { Suspense, lazy } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../slices/cartSlice";
import useProductDetails from "../hooks/useProductDetails";
import { toast } from "react-toastify";

// Lazy load the buttons
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

  const { title, description, price, image, rating } = product;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <img
            src={image}
            alt={title || "Product image"}
            className="w-auto h-auto object-fill rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2 md:pl-8">
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          <p className="text-gray-600 mb-4">{description}</p>
          <span className="text-xl font-bold text-gray-800">
            Price: ${price.toFixed(2)}
          </span>
          <div className="mt-2 text-gray-500 text-sm">
            <span>
              Rating: {rating.rate} ({rating.count} reviews)
            </span>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <AddToCartButton onClick={handleAddToCart} />
            {isAdded && <ViewCartButton onClick={handleViewCart} />}
          </Suspense>
          <Link to="/" className="block mt-4 text-blue-600 hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
