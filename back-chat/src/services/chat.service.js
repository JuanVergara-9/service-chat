const { Conversation, User } = require("../../models");
const { Op } = require("sequelize");

const getConversationsForUser = async (userId) => {
  return await Conversation.findAll({
    where: {
      [Op.or]: [
        { user1_id: userId },
        { user2_id: userId }
      ]
    },
    include: [
      { model: User, as: "user1", attributes: ["id", "name", "email"] },
      { model: User, as: "user2", attributes: ["id", "name", "email"] }
    ],
    order: [["updatedAt", "DESC"]]
  });
};

const createOrGetConversation = async (user1_id, user2_id) => {
  let conversation = await Conversation.findOne({
    where: {
      [Op.or]: [
        { user1_id, user2_id },
        { user1_id: user2_id, user2_id: user1_id }
      ]
    }
  });

  if (!conversation) {
    conversation = await Conversation.create({ user1_id, user2_id });
  }

  return conversation;
};

module.exports = {
  getConversationsForUser,
  createOrGetConversation
};
