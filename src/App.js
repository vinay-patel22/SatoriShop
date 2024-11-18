import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Home = lazy(() => import("./components/Home"));
const Login = lazy(() => import("./components/Login"));
const SignUp = lazy(() => import("./components/SignUp"));
const ProductDetails = lazy(() => import("./components/ProductDetails"));
const Cart = lazy(() => import("./components/Cart"));
const Checkout = lazy(() => import("./components/Checkout"));
const UserProfile = lazy(() => import("./components/UserProfile"));
const AboutUs = lazy(() => import("./components/AboutUs"));
const Contact = lazy(() => import("./components/ContactUs"));
const Privacy = lazy(() => import("./components/Privacy"));
const Terms = lazy(() => import("./components/Terms"));
const AdminProductForm = lazy(() => import("./components/AdminProductForm"));
const ForgotPassword = lazy(() => import("./components/ForgotPassword"));
const NotFound = lazy(() => import("./components/NotFound"));

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Elements stripe={stripePromise}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/user-profile" element={<UserProfile />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/admin" element={<AdminProductForm />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Elements>
      </Router>
    </>
  );
}

export default App;
