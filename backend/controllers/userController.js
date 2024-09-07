const { validationResult } = require('express-validator');
const UserModel = require('../models/UserModel');

// Create a new user (Candidate or Recruiter)
exports.createUser = async (req, res) => {
  try{
    const CurrentUser = new UserModel(req.body)
    await CurrentUser.save();

    res.json({
      success : true,
      message : "User created :)",
      data : CurrentUser
    })
  }

  catch(error){
    console.log(error);
    res.json({
      success : false,
      message : "Error occured :("
    })
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({
      role : "candidate"
    });
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
  

  try {
    const user = await UserModel.findOne({clerkID : req.params.id});
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
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message,
      data: null
    });
  }
};

// Get a employee by ID
exports.getEmployeeById = async (req, res) => {
  // Check for validation errors
  

  try {
    const user = await UserModel.findOne({_id : req.params.id});
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
    console.log(error)
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
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({
  //     success: false,
  //     message: 'Validation failed',
  //     errors: errors.array()
  //   });
  // }

  try {
    const updatedUser = await UserModel.findOneAndUpdate({
      clerkID : req.params.id
    },req.body,{ new: true});
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
