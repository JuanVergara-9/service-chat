const { User } = require("../../models");
const { hashPassword, comparePassword } = require("../utils/hash");
const { generateToken } = require("../utils/jwt");

const register = async ({ name, email, password }) => {
  const existing = await User.findOne({ where: { email } });
  if (existing) throw new Error("El email ya está registrado");

  const hashed = await hashPassword(password);
  const user = await User.create({ name, email, password: hashed });

  const token = generateToken({ userId: user.id, email: user.email });
  return { token, user };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Credenciales inválidas");

  const match = await comparePassword(password, user.password);
  if (!match) throw new Error("Credenciales inválidas");

  const token = generateToken({ userId: user.id, email: user.email });
  return { token, user };
};

module.exports = {
  register,
  login
};
