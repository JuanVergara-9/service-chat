const messageService = require("../services/message.service");

const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await messageService.getMessagesByConversation(conversationId);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { content } = req.body;
    const senderId = req.user.userId;

    const message = await messageService.createMessage({
      conversation_id: conversationId,
      sender_id: senderId,
      content
    });

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getMessages,
  sendMessage
};
