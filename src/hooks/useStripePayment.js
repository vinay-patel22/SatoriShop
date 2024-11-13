// src/hooks/useStripePayment.js
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";

const useStripePayment = (onSuccess, onError) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handlePayment = async (amount) => {
    if (!stripe || !elements) return;

    setLoading(true);
    try {
      // Request to your backend to create the payment intent
      const res = await fetch("http://localhost:3001/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }), // Replace with actual amount
      });

      const { clientSecret } = await res.json();

      // Confirm card payment
      const cardElement = elements.getElement(CardElement);
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (paymentResult.error) {
        onError(paymentResult.error.message);
      } else {
        if (paymentResult.paymentIntent.status === "succeeded") {
          onSuccess();
        }
      }
    } catch (error) {
      onError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    handlePayment,
    stripe, // Return stripe to be used in the component
    elements, // Return elements to be used in the component
    loading,
  };
};

export default useStripePayment;
