const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
const validateApiKey = require("../Middlewares/validateApiKey");

router.get("/", validateApiKey, userController.getAllUsers);

module.exports = router;