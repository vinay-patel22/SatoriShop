import React, { useState } from "react";
import { FaTimes } from "react-icons/fa"; // Import icons from react-icons

const SearchBar = ({ onSearch, suggestions }) => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() === "") {
      setShowSuggestions(true);
      onSearch(""); // Clear the search query in the parent component
    } else {
      onSearch(value);
      setShowSuggestions(true);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.name);
    onSearch(suggestion.name);
    setShowSuggestions(false);
  };

  const handleReset = () => {
    setQuery("");
    onSearch(""); // Clear the search query in the parent component
    setShowSuggestions(true);
  };

  const filteredSuggestions = suggestions.filter((product) =>
    product.name?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative w-full max-w-md mx-auto mb-6">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for products..."
        className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out pr-10"
      />
      {query && (
        <button
          onClick={handleReset}
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          <FaTimes size={20} color="gray" /> {/* Reset icon */}
        </button>
      )}
      {query && showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 w-full mt-1 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
          {filteredSuggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className="p-3 cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
