import React, { useState } from "react";
import axios from "axios";

const AdminProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    rating: 0,
  });
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({}); // State for validation errors

  // Constants for validation
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
        alert(`File ${file.name} exceeds the maximum size of 5MB.`);
        return false;
      }
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        alert(`File ${file.name} is not a valid type. Only JPEG/PNG allowed.`);
        return false;
      }
      return true;
    });

    if (validFiles.length + images.length > MAX_IMAGE_COUNT) {
      alert(`You can only upload up to ${MAX_IMAGE_COUNT} images.`);
    } else {
      setImages(validFiles);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
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

    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSubmit.append(key, formData[key]);
    });
    images.forEach((file) => {
      formDataToSubmit.append("images", file);
    });

    try {
      await axios.post("http://localhost:3001/api/products", formDataToSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Product added successfully!");
      setFormData({ name: "", price: "", description: "", rating: 0 });
      setImages([]);
      setErrors({});
    } catch (error) {
      console.error("Error saving product:", error);
      alert("An error occurred while saving the product.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
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
            className={`block w-full px-4 py-2 border rounded-md shadow-sm ${
              errors.name ? "border-red-500" : "border-gray-300"
            } focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out`}
            required
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
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
            className={`block w-full px-4 py-2 border rounded-md shadow-sm ${
              errors.price ? "border-red-500" : "border-gray-300"
            } focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out`}
            min="0"
            required
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price}</p>
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
            className={`block w-full px-4 py-2 border rounded-md shadow-sm ${
              errors.description ? "border-red-500" : "border-gray-300"
            } focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out`}
            required
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
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
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition duration-150 ease-in-out"
          />
          {errors.images && (
            <p className="text-red-500 text-sm mt-1">{errors.images}</p>
          )}
          <p className="text-gray-500 text-sm mt-1">
            Max 5 images, each up to 5MB.
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AdminProductForm;
