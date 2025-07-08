const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
const validateApiKey = require("../Middlewares/validateApiKey");

router.get("/", validateApiKey, userController.getAllUsers);
router.get("/search", validateApiKey, userController.searchUser);
router.delete("/:id", validateApiKey, userController.deleteUser);
router.put("/:id", validateApiKey, userController.updateUser);
router.post("/", validateApiKey, userController.addUser);

module.exports = router;