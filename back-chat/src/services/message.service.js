const { Message, User } = require("../../models");

const getMessagesByConversation = async (conversationId) => {
  return await Message.findAll({
    where: { conversation_id: conversationId },
    include: [
      {
        model: User,
        as: "sender",
        attributes: ["id", "name", "email"]
      }
    ],
    order: [["createdAt", "ASC"]]
  });
};

const createMessage = async ({ conversation_id, sender_id, content }) => {
  return await Message.create({ conversation_id, sender_id, content });
};

module.exports = {
  getMessagesByConversation,
  createMessage
};
