const { validationResult } = require('express-validator');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');

const register = catchAsync(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array().map((e) => e.msg).join(', '));
  }

  const { name, email, password, phone } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, 'An account with this email already exists');
  }

  const user = await User.create({ name, email, password, phone });
  const token = generateToken(user._id, user.role);

  res.status(201).json({
    success: true,
    message: 'Registration successful',
    data: { user, token },
  });
});

const login = catchAsync(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array().map((e) => e.msg).join(', '));
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = generateToken(user._id, user.role);
  user.password = undefined;

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: { user, token },
  });
});

const getMe = catchAsync(async (req, res) => {
  res.status(200).json({ success: true, data: { user: req.user } });
});


const logout = catchAsync(async (req, res) => {
  res.status(200).json({ success: true, message: 'Logged out successfully' });
});

module.exports = { register, login, getMe, logout };
