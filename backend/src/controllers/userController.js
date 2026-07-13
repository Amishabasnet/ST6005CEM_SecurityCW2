const User = require('../models/userModel');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const generateToken = require('../utils/generateToken');

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, 'Name, email, and password are required');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ApiError(400, 'A user with this email already exists');
  }

  const user = await User.create({ name, email, password, phone, address });

  res.status(201).json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    },
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required');
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.matchPassword(password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  res.status(200).json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    },
  });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  res.status(200).json({ success: true, data: user });
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.phone = req.body.phone || user.phone;
  user.address = req.body.address || user.address;

  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();

  res.status(200).json({
    success: true,
    data: {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    },
  });
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json({ success: true, count: users.length, data: users });
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  await user.deleteOne();

  res.status(200).json({ success: true, message: 'User removed successfully' });
});

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
};
