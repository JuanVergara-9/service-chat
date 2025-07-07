const { Message, User } = require("../../models");
const socketAuth = require("../middlewares/socketAuth");

const chatSocket = (io) => {
  io.use(socketAuth);

  io.on("connection", (socket) => {
    console.log(`Usuario conectado: ${socket.user.email}`);

    socket.on("join", (conversationId) => {
      socket.join(`conversation_${conversationId}`);
    });

    socket.on("send_message", async ({ conversationId, content }) => {
      const senderId = socket.user.userId;

      const message = await Message.create({
        conversation_id: conversationId,
        sender_id: senderId,
        content
      });

      const populated = await Message.findByPk(message.id, {
        include: [{ model: User, as: "sender", attributes: ["id", "name", "email"] }]
      });

      io.to(`conversation_${conversationId}`).emit("new_message", populated);
    });

    socket.on("disconnect", () => {
      console.log(`Usuario desconectado: ${socket.user.email}`);
    });
  });
};

module.exports = chatSocket;
