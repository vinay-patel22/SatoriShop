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
    <footer className="bg-gray-900 text-gray-200 py-12 font-sans">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          {/* Left Container */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-yellow-400 text-2xl font-bold mb-4">
              SatoriShop
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="hover:text-yellow-400 transition duration-300 transform hover:scale-105"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-yellow-400 transition duration-300 transform hover:scale-105"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-yellow-400 transition duration-300 transform hover:scale-105"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-yellow-400 transition duration-300 transform hover:scale-105"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Middle Container */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">
              Follow Us
            </h3>
            <div className="flex space-x-5">
              <a
                href="https://facebook.com/SatoriShop"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition duration-300 transform hover:scale-110"
              >
                <FaFacebookF size={24} />
              </a>
              <a
                href="https://twitter.com/SatoriShop"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition duration-300 transform hover:scale-110"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://instagram.com/SatoriShop"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition duration-300 transform hover:scale-110"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://linkedin.com/company/SatoriShop"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition duration-300 transform hover:scale-110"
              >
                <FaLinkedinIn size={24} />
              </a>
            </div>
          </div>

          {/* Right Container */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">
              Contact Us
            </h3>
            <ul className="space-y-2">
              <li>
                <p className="text-gray-400">
                  Email:{" "}
                  <a
                    href="mailto:support@SatoriShop.com"
                    className="hover:text-yellow-400 transition duration-300"
                  >
                    support@SatoriShop.com
                  </a>
                </p>
              </li>
              <li>
                <p className="text-gray-400">
                  Phone:{" "}
                  <a
                    href="tel:+15551234567"
                    className="hover:text-yellow-400 transition duration-300"
                  >
                    +1 (555) 123-4567
                  </a>
                </p>
              </li>
              <li>
                <p className="text-gray-400">
                  Address: 123 Sweet Street, Suite 100, Sugar City, SC 12345
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6">
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} SatoriShop. All rights reserved.
          </p>
          <p className="text-center text-sm text-yellow-300 mt-2">
            Made with 💖 in India by Vinay Patel
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
