const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");
const validateApiKey = require("../Middlewares/validateApiKey");

router.post("/login", validateApiKey, authController.login);

module.exports = router;