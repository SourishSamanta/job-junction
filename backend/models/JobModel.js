const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jobSchema = new Schema({
  
  title: {
    type: String,
    required: true
  },
  postedBy : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "user"
  },
  companyName: {
    type: String,
    required: true
  },
  companyLogo: {
    type: String
  },
  location: {
    type: String,
    required: true
  },
  employmentType: {
    type: [String],
    enum: ['Full-Time', 'Part-Time', 'Internship', 'Contract'],
    required: true
  },
  jobCategory: {
    type: String,
    required: true
  },
  salaryRange: {
    type: String
  },
  experienceLevel: {
    type: [String],
    enum: ['Entry-Level', 'Mid-Level', 'Senior'],
    required: true
  },
  requiredSkills: {
    type: [String],
    required: true
  },
  jobDescription: {
    type: String,
    required: true
  },
  responsibilities: {
    type: [String],
    required: true
  },
  qualifications: {
    type: [String],
    required: true
  },
  preferredQualifications: {
    type: [String]
  },
  companyDescription: {
    type: String
  },
  benefits: {
    type: [String]
  },
  applicationDeadline: {
    type: Date
  },
  postedAt: {
    type: Date,
    default: Date.now
  },
  jobStatus: {
    type: String,
    enum: ['Open', 'Closed'],
    default: 'Open'
  },
  contactEmail: {
    type: String,
    required: true
  },
  applicationLink: {
    type: String
  },
  additionalInformation: {
    type: String
  }
});

const JobModel = mongoose.model('job', jobSchema);

module.exports = JobModel;
