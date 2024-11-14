import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4 tracking-wide">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            We’re here to help! Reach out for support, questions, or feedback,
            and our team will respond promptly.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Email Section */}
          <div className="bg-white p-8 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
            <div className="flex items-center">
              <FaEnvelope className="text-blue-500 text-4xl mr-4" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Email</h2>
                <p className="text-gray-600 mt-2">support@SatoriShop.com</p>
              </div>
            </div>
          </div>

          {/* Phone Section */}
          <div className="bg-white p-8 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
            <div className="flex items-center">
              <FaPhoneAlt className="text-green-500 text-4xl mr-4" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Phone</h2>
                <p className="text-gray-600 mt-2">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="bg-white p-8 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-red-500 text-4xl mr-4" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Address
                </h2>
                <p className="text-gray-600 mt-2">
                  123 Sweet Street, Suite 100, Sugar City, SC 12345
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
