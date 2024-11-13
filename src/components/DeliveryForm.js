import React, { useState } from "react";
import { FaUser, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const DeliveryForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="delivery-form bg-white p-8 rounded-lg shadow-lg mb-6 max-w-md mx-auto"
    >
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">
        Delivery Details
      </h3>
      <div className="mb-6 flex items-center border border-gray-300 rounded-md">
        <FaUser className="text-gray-500 ml-4" />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-4 border-none rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
          required
        />
      </div>
      <div className="mb-6 flex items-center border border-gray-300 rounded-md">
        <FaPhoneAlt className="text-gray-500 ml-4" />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-4 border-none rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
          required
        />
      </div>
      <div className="mb-6 flex items-center border border-gray-300 rounded-md">
        <FaEnvelope className="text-gray-500 ml-4" />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email ID"
          className="w-full p-4 border-none rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
          required
        />
      </div>
      <div className="mb-6 flex items-start border border-gray-300 rounded-md">
        <FaMapMarkerAlt className="text-gray-500 ml-4 mt-2" />
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Delivery Address"
          className="w-full p-4 border-none rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
          rows="4"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-3 rounded-md shadow-lg hover:bg-green-700 transition duration-300 ease-in-out w-full flex items-center justify-center"
      >
        Proceed to Payment
      </button>
    </form>
  );
};

export default DeliveryForm;
