import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
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
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        dispatch(fetchProductsSuccess(data));
      } catch (err) {
        dispatch(fetchProductsFailure(err.message));
      }
    };

    fetchProducts();
  }, [dispatch]);

  if (status === "loading")
    return <p className="text-center text-gray-700">Loading...</p>;
  if (status === "failed")
    return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {items.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductListing;
