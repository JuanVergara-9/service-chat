const chatService = require("../services/chat.service");

const getMyConversations = async (req, res) => {
  try {
    const conversations = await chatService.getConversationsForUser(req.user.userId);
    res.json(conversations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createOrGetConversation = async (req, res) => {
  try {
    const user1Id = req.user.userId;
    const user2Id = parseInt(req.params.userId);

    if (user1Id === user2Id) {
      return res.status(400).json({ error: "No podés chatear con vos mismo." });
    }

    const conversation = await chatService.createOrGetConversation(user1Id, user2Id);
    res.status(201).json(conversation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getMyConversations,
  createOrGetConversation
};
