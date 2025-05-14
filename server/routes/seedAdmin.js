import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js'; // adjust path if needed

const router = express.Router();

// Temporary route to create the admin user
router.get('/create-admin', async (req, res) => {
  try {
    // Check if admin already exists
    const existing = await User.findOne({ email: 'childrenadmin@book.com' });
    if (existing) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Hash the password for the admin user
    const hashedPassword = await bcrypt.hash('Admin123', 10);

    // Create the new admin user
    const adminUser = new User({
      username: 'Admin', // Username field
      email: 'childrenadmin@book.com', // Admin email
      password: hashedPassword, // Hashed password
      role: 'admin', // If you are using roles
    });

    // Save the user in the database
    await adminUser.save();

    res.status(201).json({ message: 'Admin user created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
