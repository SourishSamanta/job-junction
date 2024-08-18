const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const jobController = require('../controllers/jobController');

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
router.post('/', validateCreateJob, jobController.createJob);

// Get all jobs
router.get('/', jobController.getAllJobs);

// Get a job by ID with validation
router.get('/:id', validateJobId, jobController.getJobById);

// Update a job by ID with validation
router.put('/:id', [...validateJobId, ...validateCreateJob], jobController.updateJobById);

// Delete a job by ID with validation
router.delete('/:id', validateJobId, jobController.deleteJobById);

module.exports = router;
