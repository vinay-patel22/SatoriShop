import express from "express";
import Order from "../models/orderModel.js";
import Product from "../models/Product.js";
const router = express.Router();

// Create a new order
router.post("/", async (req, res) => {
  try {
    const { userId, items } = req.body;

    // Validate the order items
    const products = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.product);
        if (!product) {
          throw new Error(`Product not found with id ${item.product}`);
        }
        return {
          ...item,
          price: product.price,
        };
      })
    );

    // Calculate total price
    const total = products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    // Create the order
    const order = new Order({
      user: userId,
      items: products,
      total,
    });

    await order.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("items.product");
    res.json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a single order by ID
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user")
      .populate("items.product");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an order by ID
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an order by ID
router.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
