import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import CompanyLogo from "../images/CompanyLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api";

// Yup validation schema for login form
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await login(values);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <img src={CompanyLogo} alt="Company Logo" className="h-12" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Log in to your account
        </h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              {/* Email Field */}
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Email address
                </label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className={`w-full px-4 py-2 border ${
                    errors.email && touched.email
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                    errors.email && touched.email
                      ? "focus:ring-red-500"
                      : "focus:ring-purple-500"
                  } transition duration-200 ease-in-out`}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className={`w-full px-4 py-2 border ${
                    errors.password && touched.password
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                    errors.password && touched.password
                      ? "focus:ring-red-500"
                      : "focus:ring-purple-500"
                  } transition duration-200 ease-in-out`}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end mb-6">
                <Link
                  to="/forgot-password"
                  className="text-purple-600 text-sm hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-purple-600 text-white font-semibold rounded-md shadow-lg hover:bg-purple-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Log in
              </button>

              {/* Not a Member */}
              <div className="mt-6 text-center text-gray-600">
                <p>
                  Not a member?{" "}
                  <Link
                    to="/signup"
                    className="text-purple-600 hover:underline"
                  >
                    Create an Account
                  </Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
