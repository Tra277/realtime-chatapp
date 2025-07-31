import e from "express";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { generateJwtToken } from "../lib/utils.js";
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Invalid credentials');
    }
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).send('Invalid credentials');
    }

    generateJwtToken(user._id, res);
    return res.status(200).json({
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      profilePic: user.profilePic
    });
  } catch (error) {
    return res.status(500).send('Internal server error');
  }


  // Handle user login
  res.send('Login endpoint');
}

export const signup = async (req, res) => {
  const { email, password, fullName } = req.body;

  if (password.length < 6) {
    return res.status(400).send('Password must be at least 6 characters long');
  }

  const testUser = await User.findOne({ email });
  console.log("🚀 ~ signup ~ testUser:", testUser)

  if (testUser) {
    return res.status(400).send('User already exists');
  }
  // Hash the password before saving (use bcrypt or similar library)
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = new User({ email, password: hashedPassword, fullName });
  if (user) {
    generateJwtToken(user._id, res);
    await user.save();
    return res.status(201).json({
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      profilePic: user.profilePic
    });

  } else {
    return res.status(500).send('Error creating user');
  }
  // Handle user signup
}

export const logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 0 });
  return res.status(200).json({ message: 'Logged out successfully' });
  // Handle user logout
}