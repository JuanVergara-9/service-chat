const { verifyToken } = require("../utils/jwt");

const socketAuth = (socket, next) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Token requerido en socket"));
    }

    const user = verifyToken(token);
    socket.user = user;

    next();
  } catch (err) {
    next(new Error("Token inválido en socket"));
  }
};

module.exports = socketAuth;
