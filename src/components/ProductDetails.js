import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../slices/cartSlice";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    // Fetch product details from API
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Product not found");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
        // Check if product is already in the cart
        const isInCart = cartItems.some((item) => item.id === data.id);
        setIsAdded(isInCart);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id, cartItems]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addItem(product));
      setIsAdded(true); // Update the state to show the "View My Cart" button
      toast.success("Product added to cart");
    }
  };

  const handleViewCart = () => {
    if (product) {
      navigate("/cart");
    }
  };

  if (loading)
    return <div className="text-center text-gray-700">Loading...</div>;

  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  if (!product)
    return <div className="text-center text-gray-700">Product not found</div>;

  const { title, description, price, image, rating } = product;

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <img
              src={image}
              alt={title}
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
            <button
              onClick={handleAddToCart}
              className="bg-purple-600 text-white px-4 py-2 rounded-md shadow hover:bg-purple-700 transition duration-200 ease-in-out mt-4"
            >
              Add to Cart
            </button>
            {isAdded && (
              <button
                onClick={handleViewCart}
                className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition duration-200 ease-in-out mt-4"
              >
                View My Cart
              </button>
            )}
            <Link to="/" className="block mt-4 text-blue-600 hover:underline">
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
