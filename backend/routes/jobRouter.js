const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const jobController = require('../controllers/jobController');
const JobModel = require('../models/JobModel');
const UserModel = require('../models/UserModel')

// Validation rules
const validateCreateJob = [
  body('title').notEmpty().withMessage('Job title is required'),
  body('jobDescription').notEmpty().withMessage('Job description is required'),
  body('companyName').notEmpty().withMessage('Company name is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('salaryRange').notEmpty().withMessage('Salary must be a number'),
  body('employmentType')
    .isArray().withMessage('Employment type must be an array')
    .custom((value) => {
      const validTypes = ['Full-Time', 'Part-Time', 'Internship', 'Contract'];
      return value.every(type => validTypes.includes(type));
    }).withMessage('Job type must be either Full-Time, Part-Time, Internship, or Contract'),
  // Add more field validations as needed
];


const validateJobId = [
  param('id').isMongoId().withMessage('Invalid job ID')
];

// Create a new job with validation
router.post('/', jobController.createJob);

// Get current user's job posts
router.get('/my-jobs/:clerkID', async (req, res) => {

  try {
    //get current user ID
    const CurrentUser = await UserModel.findOne({
      clerkID: req.params.clerkID
    })

    if (CurrentUser) {
      //Get current user's job
      const JobPosts = await JobModel.find({
        postedBy: CurrentUser._id
      });

      if (JobPosts) {
        return res.json({
          message: "Job found",
          success: true,
          jobs: JobPosts
        })
      }

      else
        return res.json({
          success: false,
          message: "No jobs found"
        })
    }
    else
      return res.json({
        success: false,
        message: "User not found"
      })
  }
  catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Server Error"
    })
  }

})

// Get all jobs
router.get('/', jobController.getAllJobs);

// Get a job by ID with validation
router.get('/:id', jobController.getJobById);

// Update a job by ID with validation
router.put('/:id', jobController.updateJobById);

// Delete a job by ID with validation
router.delete('/:id', jobController.deleteJobById);

module.exports = router;
