const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  clerkID : {
    type : String,
    required : true,
    unique : true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  profilePicture: {
    type: String
  },
  role: {
    type: String,
    enum: ['candidate', 'recruiter'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  // Fields specific to candidates
  currentJobTitle: {
    type: String,
    required: function() {
      return this.role === 'candidate';
    }
  },
  interests: {
    type: [String],
    required: function() {
      return this.role === 'candidate';
    }
  },
  experience: {
    type: [String],
    required: function() {
      return this.role === 'candidate';
    }
  },
  skills: {
    type: [String],
    required: function() {
      return this.role === 'candidate';
    }
  },
  resume: {
    type: String,
    required: function() {
      return this.role === 'candidate';
    }
  },
  portfolio: {
    type: String
  },
  highestDegreeEarned: {
    type: String
  },
  fieldOfStudy: {
    type: String
  },
  university: {
    type: String
  },
  graduationYear: {
    type: String
  },
  certificates: {
    type: [String]
  },
  preferredLocation: {
    type: [String]
  },
  preferredType: {
    type: [String]
  },
  desiredSalary: {
    type: String
  },
  availability: {
    type: [String]
  },
  language: {
    type: [String]
  },
  aboutYou: {
    type: String
  },
  socialLinks: {
    linkedin: {
      type: String
    },
    youtube: {
      type: String
    },
    twitter: {
      type: String
    }
  },
  hobbies: {
    type: [String]
  },
  jobAlerts: {
    type: Boolean,
    default: true
  },
  // Fields specific to recruiters
  fullName: {
    type: String,
    required: function() {
      return this.role === 'recruiter';
    }
  },
  phoneNumber: {
    type: String,
    required: function() {
      return this.role === 'recruiter';
    }
  },
  companyName: {
    type: String,
    required: function() {
      return this.role === 'recruiter';
    }
  },
  companyWebsite: {
    type: String
  },
  companyAddress: {
    type: String
  },
  industry: {
    type: String
  },
  companySize: {
    type: String
  },
  companyLogo: {
    type: String
  },
  companyDescription: {
    type: String
  },
  jobCategories: {
    type: [String]
  },
  locationPreferences: {
    type: [String]
  },
  employmentTypes: {
    type: [String]
  },
  contactPersonName: {
    type: String
  },
  contactEmail: {
    type: String
  },
  contactPhoneNumber: {
    type: String
  },
  socialMediaLinks: {
    linkedin: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    }
  },
  subscriptionPlan: {
    type: String
  },
  billingInformation: {
    type: String
  },
  planStartDate: {
    type: Date
  },
  hiringProcess: {
    type: String
  },
  companyCulture: {
    type: String
  },
  referralCode: {
    type: String
  },
  additionalInformation: {
    type: String
  }
});

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;
