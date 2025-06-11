const {User,CoachesClasses } = require('../models/index');
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
      attributes: { exclude: ['password'] },
      include: [
        {
          association: 'Trainers', // comes from `as: 'Trainers'` in model
          attributes: ['id', 'firstName', 'lastName', 'email'],
          through: { attributes: [] }, // hide pivot table data
        }
      ],
      order: [['id', 'ASC']],
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Fetch users error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



exports.updateUser = async (req, res) => {
  try {
    const { id, firstName, lastName, username, email, password, role, status, assignedTrainerIds } = req.body;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let updatedPassword = user.password;
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    await user.update({
      firstName,
      lastName,
      username,
      email,
      password: updatedPassword,
      role,
      status,
    });

    // Handle trainer assignments if role is 'trainee'
    if (role === 'trainee' && Array.isArray(assignedTrainerIds)) {
      // Remove previous assignments
      await CoachesClasses.destroy({ where: { traineeId: id } });

      // Assign new trainers
      const newAssignments = assignedTrainerIds.map((trainerId) => ({
        trainerId,
        traineeId: id,
      }));

      await CoachesClasses.bulkCreate(newAssignments);
    }

    return res.status(200).json({ message: "User updated successfully" });

  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ message: "Server error" });
  }
};