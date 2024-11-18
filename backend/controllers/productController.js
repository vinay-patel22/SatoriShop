import Product from "../models/Product.js";
import cloudinary from "../config/cloudinaryConfig.js";
import mongoose from "mongoose";

export const addProduct = async (req, res) => {
  try {
    const { name, price, description, rating } = req.body;
    let imageUrls = [];

    // Upload images to Cloudinary
    if (req.files) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        imageUrls.push(result.secure_url);
      }
    }

    const product = new Product({
      name,
      price,
      description,
      rating,
      images: imageUrls,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, rating } = req.body;
    const product = await Product.findById(id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.rating = rating || product.rating;

    // Handle image update logic if necessary

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.remove();
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("Fetching product with ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      // console.log("Invalid product ID:", id);
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const product = await Product.findById(id);
    if (!product) {
      // console.log("Product not found:", id);
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    // console.error("Error fetching product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};
