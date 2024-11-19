import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useProductDetails = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdded, setIsAdded] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      const normalizeProduct = (data, source) => {
        if (source === "fakeStore") {
          return {
            id: data.id,
            name: data.title,
            description: data.description,
            price: data.price,
            rating: data.rating?.rate || data.rating || "No rating",
            image: data.image || data.images?.[0],
            count: data.rating?.count || 0,
          };
        } else {
          return {
            id: data.id,
            name: data.name,
            description: data.description,
            price: data.price,
            rating: data.rating || "No rating",
            image: data.image || data.images?.[0],
            count: data.count || 0,
          };
        }
      };

      try {
        // First attempt: Your Backend API
        const response = await fetch(
          `http://localhost:5000/api/products/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setProduct(normalizeProduct(data, "backend"));
        } else {
          // If first API fails, fallback to FakeStore API
          const fakeResponse = await fetch(
            `https://fakestoreapi.com/products/${id}`
          );
          if (!fakeResponse.ok)
            throw new Error("Product not found in both APIs");

          const fakeData = await fakeResponse.json();
          setProduct(normalizeProduct(fakeData, "fakeStore"));
        }

        setIsAdded(cartItems.some((item) => item.id === id));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, cartItems]);

  return { product, loading, error, isAdded };
};

export default useProductDetails;
