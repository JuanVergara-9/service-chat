const { User } = require("../../models");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email"] // evitá incluir password
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

const getMe = async (req, res) => {
  const user = await User.findByPk(req.user.userId, {
    attributes: ["id", "name", "email"]
  });
  res.json(user);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id, {
    attributes: ["id", "name", "email"]
  });

  if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
  res.json(user);
};

module.exports = {
  getAllUsers,
  getMe,
  getUserById
};
