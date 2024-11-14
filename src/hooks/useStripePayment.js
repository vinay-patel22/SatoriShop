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
      // Request to backend to create the payment intent
      const response = await fetch(
        "http://localhost:3001/api/payments/create-payment-intent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }), // Amount in cents
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create payment intent");
      }

      const { clientSecret } = await response.json();

      // Confirm card payment
      const cardElement = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: { card: cardElement },
        }
      );

      if (error) {
        onError(error.message);
      } else if (paymentIntent.status === "succeeded") {
        onSuccess();
      } else {
        onError("Payment not completed");
      }
    } catch (error) {
      onError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    handlePayment,
    stripe,
    elements,
    loading,
  };
};

export default useStripePayment;
