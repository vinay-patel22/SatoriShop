import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const AdminProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    rating: 0,
  });
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const MAX_IMAGE_COUNT = 5;
  const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const validFiles = selectedFiles.filter((file) => {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`File ${file.name} exceeds the maximum size of 5MB.`);
        return false;
      }
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        toast.error(
          `File ${file.name} is not a valid type. Only JPEG/PNG allowed.`
        );
        return false;
      }
      return true;
    });

    if (validFiles.length + images.length > MAX_IMAGE_COUNT) {
      toast.error(`You can only upload up to ${MAX_IMAGE_COUNT} images.`);
    } else {
      setImages(validFiles);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required.";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Valid price is required.";
    if (!formData.description.trim())
      newErrors.description = "Description is required.";
    if (!images.length) newErrors.images = "At least one image is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSubmit.append(key, formData[key]);
    });
    images.forEach((file) => {
      formDataToSubmit.append("images", file);
    });

    try {
      await axios.post("http://localhost:5000/api/products", formDataToSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      toast.success("Product added successfully!");
      setFormData({ name: "", price: "", description: "", rating: 0 });
      setImages([]);
      setErrors({});
      setShowModal(true);
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred while saving the product.");
    }
  };

  const handleAddMoreProducts = () => {
    setShowModal(false);
  };

  const handleLater = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Add New Product
        </h2>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className={`block w-full px-4 py-3 border rounded-md shadow-sm ${
              errors.name ? "border-red-500" : "border-gray-300"
            } focus:ring-purple-500 focus:border-purple-500 transition duration-200`}
            required
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-2">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            className={`block w-full px-4 py-3 border rounded-md shadow-sm ${
              errors.price ? "border-red-500" : "border-gray-300"
            } focus:ring-purple-500 focus:border-purple-500 transition duration-200`}
            min="0"
            required
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-2">{errors.price}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            className={`block w-full px-4 py-3 border rounded-md shadow-sm ${
              errors.description ? "border-red-500" : "border-gray-300"
            } focus:ring-purple-500 focus:border-purple-500 transition duration-200`}
            required
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-2">{errors.description}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="images"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Upload Images (JPEG/PNG)
          </label>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 transition duration-200"
          />
          {errors.images && (
            <p className="text-red-500 text-sm mt-2">{errors.images}</p>
          )}
          <p className="text-gray-500 text-sm mt-2">
            Max 5 images, each up to 5MB.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <ClipLoader color={"#6b46c1"} loading={loading} size={50} />
          </div>
        ) : (
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 px-4 rounded-md shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200"
          >
            Add Product
          </button>
        )}
      </form>

      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Product Added Successfully!
            </h2>
            <p className="text-gray-600">
              Do you want to add more products or continue later?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleAddMoreProducts}
                className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200"
              >
                Add More Products
              </button>
              <button
                onClick={handleLater}
                className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 transition duration-200"
              >
                Later
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminProductForm;
