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
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${id}`
        );

        if (!response.ok) throw new Error("Product not found");

        const data = await response.json();
        setProduct(data);
        setIsAdded(cartItems.some((item) => item.id === data.id));
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
