'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: { isEmail: true }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  User.associate = (models) => {
    User.hasMany(models.Conversation, { foreignKey: 'user1_id', as: 'conversations1' });
    User.hasMany(models.Conversation, { foreignKey: 'user2_id', as: 'conversations2' });
    User.hasMany(models.Message, { foreignKey: 'sender_id', as: 'messages' });
  };

  return User;
};
