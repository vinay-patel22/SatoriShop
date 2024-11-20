import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message bg-red-100 text-red-800 p-4 rounded-lg shadow-md mt-6">
      <p className="text-lg font-semibold">{message}</p>
    </div>
  );
};

export default ErrorMessage;
