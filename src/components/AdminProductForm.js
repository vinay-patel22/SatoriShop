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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSubmit.append(key, formData[key]);
    });
    Array.from(images).forEach((file) => {
      formDataToSubmit.append("images", file);
    });

    try {
      await axios.post("http://localhost:3001/api/products", formDataToSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Product Name"
        className="block w-full mb-4 border p-2"
        required
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        className="block w-full mb-4 border p-2"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="block w-full mb-4 border p-2"
        required
      />
      <input
        type="file"
        name="images"
        multiple
        onChange={handleFileChange}
        className="block w-full mb-4"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Add Product
      </button>
    </form>
  );
};

export default AdminProductForm;
