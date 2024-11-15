import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import NotFound from "./components/NotFound";
import ForgotPassword from "./components/ForgotPassword";
import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkout from "./components/Checkout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import UserProfile from "./components/UserProfile";
import AboutUs from "./components/AboutUs";
import Contact from "./components/ContactUs";
import Privacy from "./components/Privacy";
import Terms from "./components/Terms";
import AdminProductForm from "./components/AdminProductForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function App() {
  return (
    <>
      <ToastContainer />{" "}
      <Router>
        <Elements stripe={stripePromise}>
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
        </Elements>
      </Router>
    </>
  );
}

export default App;
