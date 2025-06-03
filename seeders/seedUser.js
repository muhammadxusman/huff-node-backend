const bcrypt = require('bcryptjs');
const User = require('../models/User');

const seedUser = async () => {
  try {
    const existing = await User.findOne({ where: { email: 'admin@example.com' } });

    if (!existing) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        username: 'admin',
        email: 'admin@example.com',
        password: hashedPassword,
      });
      console.log('Default user created!');
    } else {
      console.log('Default user already exists.');
    }

    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedUser();
