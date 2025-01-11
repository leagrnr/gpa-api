const express = require("express");
const userController = require("../controllers/utilisateurController");

const router = express.Router();

router.post("/users", userController.login);
router.get("/users/role/:role", userController.getUsersByRole);
router.get("/users/:id", userController.getUserById);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
