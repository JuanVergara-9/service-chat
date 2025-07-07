const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message.controller");
const authenticate = require("../middlewares/auth.middleware");

router.use(authenticate);

router.get("/:conversationId", messageController.getMessages);
router.post("/:conversationId", messageController.sendMessage);

module.exports = router;
