import express from "express";
import multer from "multer";
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getProducts,
} from "../controllers/productController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", getProducts);
router.post("/", upload.array("images", 3), addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
