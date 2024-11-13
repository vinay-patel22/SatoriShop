// src/components/StripePaymentForm.jsx
import React from "react";
import { CardElement } from "@stripe/react-stripe-js";
import useStripePayment from "../hooks/useStripePayment";

const StripePaymentForm = ({ onSuccess, onError }) => {
  const { handlePayment, stripe, elements, loading } = useStripePayment(
    onSuccess,
    onError
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePayment(1000); // Replace with actual amount
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="stripe-payment-form bg-white p-6 rounded-lg shadow-md mb-6"
    >
      <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition duration-200 ease-in-out mt-4"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default StripePaymentForm;
