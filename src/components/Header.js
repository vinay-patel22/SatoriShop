import React from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CompanyLogo from "../images/CompanyLogo.png";

const Header = () => {
  const cart = useSelector((state) => state.cart.items);
  const cartItemCount = cart.length;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleProfileClick = () => {
    if (token) {
      navigate("/user-profile"); // Go to user profile if token exists
    } else {
      navigate("/login"); // Go to login if not authenticated
    }
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <img src={CompanyLogo} alt="Company Logo" className="h-12" />
      </div>

      <div className="flex-1 text-center">
        <p className="text-2xl font-extrabold text-gray-800">
          Welcome to Satori Shop
        </p>
        <p className="text-sm text-black-600">
          Shop with Clarity, Live with Purpose
        </p>
      </div>

      <div className="flex items-center space-x-6">
        <Link to="/cart" className="relative">
          <FaShoppingCart className="text-purple-600 text-2xl cursor-pointer" />
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-2 py-1">
              {cartItemCount}
            </span>
          )}
        </Link>
        <Link to="/user-profile" onClick={handleProfileClick}>
          <FaUserCircle className="text-purple-600 text-2xl cursor-pointer" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
