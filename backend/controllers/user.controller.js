import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import "dotenv/config";

const cookieOptions = {
  httpOnly: true,
  secure: false, // Set to true if using HTTPS
  sameSite: 'Lax'
};

// Controller function to register a new user
export const registerUser = async (req, res) => {
  const { username, email, password, avatar } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    let hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const user = await User.create({ username, email, password: hashedPassword, avatar });

    res.status(201).json({
       _id: user._id,
       username: user.username,
       email: user.email,
       avatar: user.avatar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};
// Controller function to login a user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Check for user by email
    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token expires in 30 days
      });
      res.cookie('token', token, cookieOptions);
      res.json({message: "Logged in successfully", success: true, token, user });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Controller function to logout a user
export const logoutUser = (req, res) => {
  res.clearCookie('token', cookieOptions).json({ message: 'Logged out successfully' });
};
