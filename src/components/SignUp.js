import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../slices/userSlice";
import { useDispatch } from "react-redux";
import CompanyLogo from "../images/CompanyLogo.png";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be 50 characters or less")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(/[^a-zA-Z0-9]/, "Must contain at least one special character")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const InputField = ({ name, type, placeholder, errors, touched }) => (
  <div className="mb-6">
    <label
      htmlFor={name}
      className="block text-gray-700 text-sm font-medium mb-2"
    >
      {placeholder}
    </label>
    <Field
      name={name}
      type={type}
      placeholder={placeholder}
      className={`w-full px-4 py-2 border ${
        errors[name] && touched[name] ? "border-red-500" : "border-gray-300"
      } rounded-md shadow-sm focus:outline-none focus:ring-2 ${
        errors[name] && touched[name]
          ? "focus:ring-red-500"
          : "focus:ring-purple-500"
      } transition duration-200 ease-in-out`}
    />
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-sm mt-1"
    />
  </div>
);

const SignUpForm = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await dispatch(signupUser(values)).unwrap(); // Use unwrap to get the response
      navigate("/login");
    } catch (err) {
      setError(err.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <img src={CompanyLogo} alt="Company Logo" className="h-12" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Create a New Account
        </h2>
        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
        )}
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <InputField
                name="name"
                type="text"
                placeholder="Enter Name"
                errors={errors}
                touched={touched}
              />
              <InputField
                name="email"
                type="email"
                placeholder="Email address"
                errors={errors}
                touched={touched}
              />
              <InputField
                name="password"
                type="password"
                placeholder="Password"
                errors={errors}
                touched={touched}
              />
              <InputField
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                errors={errors}
                touched={touched}
              />
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 ${
                  loading ? "bg-gray-400" : "bg-purple-600"
                } text-white font-semibold rounded-md shadow-lg hover:bg-purple-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500`}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
              <div className="mt-6 text-center text-gray-600">
                <p>
                  Already a Member?{" "}
                  <Link to="/login" className="text-purple-600 hover:underline">
                    Log In
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

export default SignUpForm;
