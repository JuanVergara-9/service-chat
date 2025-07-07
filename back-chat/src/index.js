require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("../models"); // o ajustar según la ubicación real

const authRoutes = require("./routes/auth.routes");

const app = express();
const PORT = process.env.PORT || 4005;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/auth", authRoutes);

// DB + Socket (si agregás más)
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Chat-service corriendo en http://localhost:${PORT}`);
  });
});
