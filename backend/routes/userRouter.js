const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/userController');
const UserModel = require('../models/UserModel');

// Validation rules
const validateCreateUser = [
  body('username').notEmpty().withMessage('Username is required'),
  body('clerkID').notEmpty().withMessage('ClerkID is required'),
  
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('role').isIn(['candidate', 'recruiter']).withMessage('Role must be either candidate or recruiter'),
  body('currentJobTitle').if(body('role').equals('candidate')).notEmpty().withMessage('Current job title is required for candidates'),
  body('fullName').if(body('role').equals('recruiter')).notEmpty().withMessage('Full name is required for recruiters'),
  // Add more field validations as needed
];

const validateUserId = [
  param('id').isMongoId().withMessage('Invalid user ID')
];

// Create a new user with validation
router.post('/', userController.createUser);

// router.post('/', async(req,res) => {
//   try{
//     const CurrentUser = new UserModel(req.body)
//     console.log(req.body)
//     await CurrentUser.save();

//     res.json({
//       success : true,
//       message : "User created :)",
//       data : CurrentUser
//     })
//   }

//   catch(error){
//     console.log(error);
//     res.json({
//       success : false,
//       message : "Error occured :("
//     })
//   }
// })

// Get all users
router.get('/', userController.getAllUsers);

// Get a user by ID with validation
router.get('/:id', userController.getUserById);




// Update a user by ID with validation
router.put('/:id',  userController.updateUserById);

// Delete a user by ID with validation
router.delete('/:id',  userController.deleteUserById);

module.exports = router;
