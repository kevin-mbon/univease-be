import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  secondName: { type: String, required: true },
  dateOfBirth: { type: Date },
  profile: { type: String },
  gender: { type: String, enum: ["female", "male", "other"] },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },

<<<<<<< HEAD
  educationalBackground: {
    highSchoolOrUniversity: {
      type: String,
=======
        firstName: { type: String, required: true },
        secondName: { type: String, required: true },
        dateOfBirth: { type: Date},
        country: { type: String, required: true},
        city: { type: String, required: true},
        phoneNumber: { type: Number, required: true},
        gender: { type: String,
            enum: ['female','male','other']
        },
        email: {type: String, required: true},
        password: { type:String,required: true},
  

     educationalBackground: {
        highSchoolOrUniversity: {
            type: String
        },
        graduationYear: {
            type: Number
        },
        gpaOrGrades: {
            type: Number
        }
     },
     workExperience: {
        relevantExperience: {
            type: String
        }
    },
    lettersOfRecommendation: {
        uploadOption: {
            type: Boolean,
            default: false
        },
        contactInformation: {
            type: String
        }
    },
    personalStatement: {
        type: String
>>>>>>> 4b8ecdc (cleaning code)
    },
    graduationYear: {
      type: Number,
    },
    gpaOrGrades: {
      type: Number,
    },
  },
  workExperience: {
    relevantExperience: {
      type: String,
    },
  },
  lettersOfRecommendation: {
    uploadOption: {
      type: Boolean,
      default: false,
    },
    contactInformation: {
      type: String,
    },
  },
  personalStatement: {
    type: String,
  },
  resume: {
    type: String,
  },
  portfolio: {
    type: String,
  },
  languageProficiency: {
    englishProficiencyTest: {
      type: String,
    },
  },
  financialInformation: {
    type: String,
  },
  preferredStartDate: {
    type: String,
  },
  applicationFeePayment: {
    type: Boolean,
    default: false,
  },
  securityMeasures: {
    twoFactorAuthentication: {
      type: Boolean,
      default: false,
    },
  },
  termsAndConditions: {
    type: Boolean,
  },
});

const Applicant = mongoose.model("Applicant", applicantSchema);

export default Applicant;
