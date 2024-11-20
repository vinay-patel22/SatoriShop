import { useState } from "react";

const useCheckout = () => {
  const [deliveryDetails, setDeliveryDetails] = useState(null);
  const [paymentOption, setPaymentOption] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [error, setError] = useState(null);

  const handleDeliveryFormSubmit = (details) => {
    setDeliveryDetails(details);
  };

  const handlePaymentOptionSelect = (option) => {
    setPaymentOption(option);
  };

  const handlePaymentSuccess = () => {
    setPaymentStatus("success");
  };

  const handlePaymentError = (message) => {
    setError(message);
    setPaymentStatus("failed");
  };

  return {
    deliveryDetails,
    paymentOption,
    paymentStatus,
    error,
    handleDeliveryFormSubmit,
    handlePaymentOptionSelect,
    handlePaymentSuccess,
    handlePaymentError,
  };
};

export default useCheckout;
