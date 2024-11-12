import React from "react";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-6">
          Oops! The page you're looking for does not exist.
        </p>
        <a href="/" className="text-blue-600 hover:underline text-lg">
          Go back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
