import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 font-mono">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          {/* Left Container */}
          <div className="mb-4 md:mb-0">
            <h3 className="text-yellow-100 text-lg font-semibold mb-2">
              SatoriShop
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="hover:text-gray-400 transition duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-gray-400 transition duration-200"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-gray-400 transition duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-gray-400 transition duration-200"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Middle Container */}
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/SatoriShop"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="https://twitter.com/SatoriShop"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://instagram.com/SatoriShop"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://linkedin.com/company/SatoriShop"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                <FaLinkedinIn size={20} />
              </a>
            </div>
          </div>

          {/* Right Container */}
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <p className="text-gray-400">Email: support@satorishop.com</p>
              </li>
              <li>
                <p className="text-gray-400">Phone: +1 (555) 123-4567</p>
              </li>
              <li>
                <p className="text-gray-400">
                  Address: 123 Sweet Street, Suite 100, Sugar City, SC 12345
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-4">
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} SatoriShop. All rights reserved.
          </p>
          <p className="text-center text-sm text-yellow-50 mt-2">
            Made with 💖 in India by Vinay Patel
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
