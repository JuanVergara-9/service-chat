'use strict';
module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define('Conversation', {
    user1_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user2_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});

  Conversation.associate = (models) => {
    Conversation.belongsTo(models.User, { foreignKey: 'user1_id', as: 'user1' });
    Conversation.belongsTo(models.User, { foreignKey: 'user2_id', as: 'user2' });
    Conversation.hasMany(models.Message, { foreignKey: 'conversation_id', as: 'messages' });
  };

  return Conversation;
};
