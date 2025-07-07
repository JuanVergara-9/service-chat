'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    conversation_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {});

  Message.associate = (models) => {
    Message.belongsTo(models.Conversation, { foreignKey: 'conversation_id', as: 'conversation' });
    Message.belongsTo(models.User, { foreignKey: 'sender_id', as: 'sender' });
  };

  return Message;
};
