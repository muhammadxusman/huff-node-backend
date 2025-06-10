const {User} = require('../models/index');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, role, status } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      role,
      status,
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Create user error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }, // Do not expose passwords
      order: [['id', 'ASC']],
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Fetch users error:", error);
    res.status(500).json({ message: "Server error" });
  }
};