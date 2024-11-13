import React from "react";
import { Link } from "react-router-dom";

const SuccessMessage = () => {
  return (
    <div className="success-message bg-green-100 text-green-800 p-4 rounded-lg shadow-md mt-6">
      <p className="text-lg font-semibold">Payment successful! Order placed.</p>
      <div className="mt-4">
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white py-2 px-4 rounded shadow-lg hover:bg-blue-700 transition duration-200 ease-in-out"
        >
          Go to Home Page
        </Link>
      </div>
    </div>
  );
};

export default SuccessMessage;
