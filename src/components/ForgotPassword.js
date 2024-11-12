import React from "react";
import CompanyLogo from "../images/CompanyLogo.png";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <img src={CompanyLogo} alt="Company Logo" className="h-12" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
          Enter Email to Reset Password
        </h2>
        <form>
          <div className="mb-8">
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 ease-in-out"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-purple-600 text-white font-semibold rounded-md shadow-lg hover:bg-purple-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Send Email
          </button>
          <div className="mt-6 text-center text-gray-600">
            <p>
              <Link to="/login" className="text-purple-600 hover:underline">
                Send me back to Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
