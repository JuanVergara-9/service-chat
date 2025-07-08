require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { sequelize } = require("../models");
const chatSocket = require("./sockets/chatSocket");

// Crear app Express
const app = express();
const server = http.createServer(app);

// Instanciar socket.io y pasarle el servidor HTTP
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

// Rutas
const authRoutes = require("./routes/auth.routes");
const chatRoutes = require("./routes/chat.routes");
const messageRoutes = require("./routes/messages.routes");
const userRoutes = require("./routes/users.routes");

app.use("/auth", authRoutes);
app.use("/conversations", chatRoutes);
app.use("/messages", messageRoutes);
app.use("/users", userRoutes);

// Iniciar WebSocket
chatSocket(io);

// Levantar servidor
const PORT = process.env.PORT || 4005;
sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`✅ Chat-service corriendo en http://localhost:${PORT}`);
  });
});
