import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  fetchProductsSuccess,
  fetchProductsFailure,
  setLoading,
} from "../slices/productsSlice";

const ProductListing = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading());
      try {
        const response = await axios.get("http://localhost:3001/api/products");
        dispatch(fetchProductsSuccess(response.data));
      } catch (err) {
        dispatch(fetchProductsFailure(err.message));
      }
    };

    fetchProducts();
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {items.map((product) => (
        <div key={product._id} className="border p-4">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p>{product.description}</p>
          <p>${product.price}</p>

          {/* Check if product has images and display the first one */}
          {product.images && product.images.length > 0 && (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductListing;
