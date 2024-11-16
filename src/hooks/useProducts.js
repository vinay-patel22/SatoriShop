import { useState, useEffect } from "react";
import axios from "axios";

const useProducts = (selectedCategory) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9); // Adjust page size here if needed

  // Fetch products from both APIs
  useEffect(() => {
    const fetchProducts = async () => {
      setStatus("loading");
      try {
        // Fetch from both APIs
        const backendPromise = axios.get("http://localhost:3001/api/products");
        const onlinePromise = fetch("https://fakestoreapi.com/products").then(
          (res) => res.json()
        );

        const [backendResponse, onlineResponse] = await Promise.all([
          backendPromise,
          onlinePromise,
        ]);

        // Format Free API products
        const formattedOnlineResponse = onlineResponse.map((product) => ({
          id: product.id,
          name: product.title,
          price: product.price,
          description: product.description,
          image: product.image,
          rating: product.rating?.rate || 0,
          count: product.rating?.count || 0,
        }));

        // Format Backend API products
        const formattedBackendResponse = backendResponse.data.map(
          (product) => ({
            id: product._id,
            name: product.name,
            price: product.price,
            description: product.description,
            image: product.images[0] || "", // Use first image
            rating: product.rating || 0,
            count: 0, // Backend doesn't have count, default to 0
          })
        );

        // Combine both sets of products
        const combinedData = [
          ...formattedBackendResponse,
          ...formattedOnlineResponse,
        ];

        setItems(combinedData);
        setFilteredItems(combinedData);
        setStatus("succeeded");
      } catch (err) {
        setStatus("failed");
        setError(err.message);
      }
    };

    fetchProducts();
  }, []);

  // Handle pagination logic
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Filter and search logic
  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setHasSearched(true);
    if (searchQuery) {
      const filtered = items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(items);
    }
  };

  // Sorting logic
  const handleSort = (sortOption) => {
    let sortedItems = [...filteredItems];
    if (sortOption === "asc") {
      sortedItems.sort((a, b) => a.price - b.price);
    } else if (sortOption === "desc") {
      sortedItems.sort((a, b) => b.price - a.price);
    }
    setFilteredItems(sortedItems);
  };

  const handleReset = () => {
    setFilteredItems(items);
    setQuery("");
    setHasSearched(false);
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return {
    items,
    filteredItems,
    status,
    error,
    query,
    hasSearched,
    currentPage,
    paginatedItems,
    totalPages,
    handleSearch,
    handleSort,
    handleReset,
    handlePageChange,
  };
};

export default useProducts;
