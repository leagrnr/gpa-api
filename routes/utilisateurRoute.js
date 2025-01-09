const express = require("express");
const userController = require("../controllers/utilisateurController");

const router = express.Router();

router.post("/login", userController.login);

module.exports = router;
