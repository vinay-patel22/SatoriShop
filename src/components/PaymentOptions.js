import React from "react";

const PaymentOptions = ({ onSelectPaymentOption }) => {
  return (
    <div className="payment-options bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4">Payment Options</h3>
      <div className="flex flex-col space-y-4">
        <button
          onClick={() => onSelectPaymentOption("cash")}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md shadow hover:bg-gray-300 transition duration-200 ease-in-out"
        >
          Cash on Delivery
        </button>
        <button
          onClick={() => onSelectPaymentOption("stripe")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition duration-200 ease-in-out"
        >
          Pay with Card (Stripe)
        </button>
        <button
          onClick={() => onSelectPaymentOption("qr")}
          className="bg-purple-600 text-white px-4 py-2 rounded-md shadow hover:bg-purple-700 transition duration-200 ease-in-out"
        >
          Pay with QR Code
        </button>
      </div>
    </div>
  );
};

export default PaymentOptions;
