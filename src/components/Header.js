import React from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../slices/userSlice";
import CompanyLogo from "../images/CompanyLogo.png";

const ROUTES = {
  CART: "/cart",
  LOGIN: "/login",
  USER_PROFILE: "/user-profile",
};

const Header = () => {
  const cartItemCount = useSelector((state) => state.cart.items.length);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleProfileClick = () => {
    if (token) {
      navigate(ROUTES.USER_PROFILE);
    } else {
      navigate(ROUTES.LOGIN);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
      <img src={CompanyLogo} alt="Company Logo" className="h-12" />

      <div className="flex-1 text-center">
        <p className="text-2xl font-extrabold text-gray-800">
          Welcome to Satori Shop
        </p>
        <p className="text-sm text-gray-600">
          Shop with Clarity, Live with Purpose
        </p>
      </div>

      <div className="flex items-center space-x-6">
        <Link to={ROUTES.CART} className="relative" aria-label="Shopping Cart">
          <FaShoppingCart className="text-purple-600 text-2xl cursor-pointer" />
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-2 py-1">
              {cartItemCount}
            </span>
          )}
        </Link>
        <FaUserCircle
          className="text-purple-600 text-2xl cursor-pointer"
          onClick={handleProfileClick}
          aria-label="User Profile"
        />
        {token && (
          <button onClick={handleLogout} className="text-red-600">
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
