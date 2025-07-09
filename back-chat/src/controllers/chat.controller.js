const chatService = require("../services/chat.service");
const { Op } = require("sequelize");

const getMyConversations = async (req, res) => {
  try {
    const conversations = await chatService.getConversationsForUser(req.user.userId);
    res.json(conversations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getConversationWithUser = async (req, res) => {
  const userId = req.user.id; // quien hace la request
  const otherUserId = parseInt(req.params.userId);

  try {
    const messages = await Message.findAll({
      where: {
        // Mensajes entre ambos usuarios (ida y vuelta)
        [Op.or]: [
          { senderId: userId, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: userId },
        ]
      },
      order: [["createdAt", "ASC"]],
    });

    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener la conversación" });
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
  getConversationWithUser,
  createOrGetConversation
};
