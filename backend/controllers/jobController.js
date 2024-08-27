const { validationResult } = require('express-validator');
const JobModel = require('../models/JobModel');

// Create a new job
exports.createJob = async (req, res) => {
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
    const newJob = new JobModel(req.body);
    const savedJob = await newJob.save();
    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      data: savedJob
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

// Get all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await JobModel.find();
    res.status(200).json({
      success: true,
      message: 'Jobs fetched successfully',
      data: jobs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null
    });
  }
};

// Get a job by ID
exports.getJobById = async (req, res) => {
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
    const job = await JobModel.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
        data: null
      });
    }
    res.status(200).json({
      success: true,
      message: 'Job fetched successfully',
      data: job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null
    });
  }
};

// Update a job by ID
exports.updateJobById = async (req, res) => {
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
    const updatedJob = await JobModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedJob) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
        data: null
      });
    }
    res.status(200).json({
      success: true,
      message: 'Job updated successfully',
      data: updatedJob
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null
    });
  }
};

// Delete a job by ID
exports.deleteJobById = async (req, res) => {
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
    const deletedJob = await JobModel.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
        data: null
      });
    }
    res.status(200).json({
      success: true,
      message: 'Job deleted successfully',
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
