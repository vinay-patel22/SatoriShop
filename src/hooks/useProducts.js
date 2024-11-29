import { useState, useEffect } from "react";
import axios from "axios";

const useProducts = (selectedCategory) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setStatus("loading");
      try {
        // Fetch from both APIs
        const backendPromise = axios.get("http://localhost:5000/api/products");
        const onlinePromise = fetch("https://fakestoreapi.com/products").then(
          (res) => res.json()
        );

        // Use Promise.allSettled to wait for both promises to settle
        const [backendResult, onlineResult] = await Promise.allSettled([
          backendPromise,
          onlinePromise,
        ]);

        let combinedData = [];

        // Check the results and process accordingly
        if (backendResult.status === "fulfilled") {
          const backendResponse = backendResult.value.data;
          // Format and add backend data to combinedData
          const formattedBackendResponse = backendResponse.map((product) => ({
            id: product._id,
            name: product.name,
            price: product.price,
            description: product.description,
            image: product.images[0] || "",
            rating: product.rating || 0,
            count: 0, // Backend doesn't have count, default to 0
          }));
          combinedData = [...combinedData, ...formattedBackendResponse];
        } else {
          console.error("Backend API failed:", backendResult.reason);
        }

        if (onlineResult.status === "fulfilled") {
          const onlineResponse = onlineResult.value;
          // Format and add online data to combinedData
          const formattedOnlineResponse = onlineResponse.map((product) => ({
            id: product.id,
            name: product.title,
            price: product.price,
            description: product.description,
            image: product.image,
            rating: product.rating?.rate || 0,
            count: product.rating?.count || 0,
          }));
          combinedData = [...combinedData, ...formattedOnlineResponse];
        } else {
          console.error("Online API failed:", onlineResult.reason);
        }

        if (combinedData.length > 0) {
          setItems(combinedData);
          setFilteredItems(combinedData);
          setStatus("succeeded");
        } else {
          setStatus("failed");
          setError("Both API calls failed. Please try again later.");
        }
      } catch (err) {
        setStatus("failed");
        setError(err.message);
      }
    };

    fetchProducts();
  }, []);

  return {
    items,
    filteredItems,
    status,
    error,
  };
};

export default useProducts;
