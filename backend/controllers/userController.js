const { validationResult } = require('express-validator');
const UserModel = require('../models/UserModel');

// Create a new user (Candidate or Recruiter)
exports.createUser = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  try {
    const newUser = new UserModel(req.body);
    const savedUser = await newUser.save();
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: savedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null
    });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null
    });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        data: null
      });
    }
    res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null
    });
  }
};

// Update a user by ID
exports.updateUserById = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        data: null
      });
    }
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null
    });
  }
};

// Delete a user by ID
exports.deleteUserById = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        data: null
      });
    }
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null
    });
  }
};
