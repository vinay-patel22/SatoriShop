// src/components/Checkout.jsx
import React from "react";
import OrderSummary from "./OrderSummary";
import DeliveryForm from "./DeliveryForm";
import PaymentOptions from "./PaymentOptions";
import StripePaymentForm from "./StripePaymentForm";
import SuccessMessage from "./SuccessMessage";
import ErrorMessage from "./ErrorMessage";
import useCheckout from "../hooks/useCheckout";

const Checkout = () => {
  const {
    deliveryDetails,
    paymentOption,
    paymentStatus,
    error,
    handleDeliveryFormSubmit,
    handlePaymentOptionSelect,
    handlePaymentSuccess,
    handlePaymentError,
  } = useCheckout();

  return (
    <div className="checkout-container p-6 max-w-4xl mx-auto">
      <OrderSummary />

      {paymentStatus === null && (
        <>
          {!deliveryDetails ? (
            <DeliveryForm onSubmit={handleDeliveryFormSubmit} />
          ) : (
            <PaymentOptions onSelectPaymentOption={handlePaymentOptionSelect} />
          )}

          {paymentOption === "stripe" && deliveryDetails && (
            <StripePaymentForm
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          )}
        </>
      )}

      {paymentStatus === "success" && <SuccessMessage />}
      {paymentStatus === "failed" && error && <ErrorMessage message={error} />}
    </div>
  );
};

export default Checkout;
