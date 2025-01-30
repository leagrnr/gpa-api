const express = require("express");
const produitController = require("../controllers/produitController");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/products", authenticateToken, produitController.create);
router.get("/products", authenticateToken, produitController.getAllProducts);
router.get("/products/:id", authenticateToken, produitController.getProductById);
router.put("/products/:id", authenticateToken, produitController.updateProduct);
router.delete("/products/:id", authenticateToken, produitController.deleteProduct);

module.exports = router;