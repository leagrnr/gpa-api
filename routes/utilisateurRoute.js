const express = require("express");
const userController = require("../controllers/utilisateurController");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/users", userController.login);
router.get(
  "/users/role/:role",
  authenticateToken,
  userController.getUsersByRole,
);
router.get("/users/:id", authenticateToken, userController.getUserById);
router.put("/users/:id", authenticateToken, userController.updateUser);
router.delete("/users/:id", authenticateToken, userController.deleteUser);

module.exports = router;
