const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authenticate = require("../middlewares/auth.middleware");

router.use(authenticate);

router.get("/me", userController.getMe);
router.get("/:id", userController.getUserById);

module.exports = router;
