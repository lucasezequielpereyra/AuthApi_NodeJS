import 'dotenv/config';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import Role from '../models/Role';

export const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password),
    });

    const userRole = await Role.findOne({ name: 'user' });
    newUser.roles = [userRole._id];

    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, process.env.SECRET, {
      expiresIn: 86400,
    });

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async (req, res) => {
  try {
    const userFound = await User.findOne({ email: req.body.email }).populate(
      'roles',
    );

    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password,
    );

    if (!matchPassword)
      return res.status(401).json({ token: null, message: 'Invalid password' });

    if (!userFound) return res.status(400).json({ message: 'User not found' });

    const token = jwt.sign({ id: userFound._id }, process.env.SECRET, {
      expiresIn: 86400,
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
  }
};
