const authService = require("../services/auth.service");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await authService.register({ name, email, password });
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login({ email, password });
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const getMe = (req, res) => {
  res.json({ user: req.user });
};

module.exports = {
  register,
  login,
  getMe
};
