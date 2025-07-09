const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chat.controller");
const authenticate = require("../middlewares/auth.middleware");

router.use(authenticate);

router.get("/", chatController.getMyConversations);
router.get("/:userId", chatController.getConversationWithUser);
router.post("/:userId", chatController.createOrGetConversation);

module.exports = router;
