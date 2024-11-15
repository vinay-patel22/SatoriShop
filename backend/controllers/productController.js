import Product from "../models/Product.js";
import cloudinary from "../config/cloudinaryConfig.js";

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
