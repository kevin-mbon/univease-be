import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    secondName: { type: String, required: true },
    dateOfBirth: { type: Date },
    profile: { type: String },
    gender: { type: String, enum: ["female", "male", "other"] },
    email: { type: String, required: true },
    password: { type: String, required: true },
    educationalBackground: {
      highSchoolOrUniversity: {
        type: String,
      },
      graduationYear: {
        type: Number,
      },
      gpaOrGrades: {
        type: Number,
      },
    },
    workExperience: {
      type: String,
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
      type: String,
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
      type: Boolean,
      default: false,
    },
    termsAndConditions: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Applicant = mongoose.model("Applicant", applicantSchema);

export default Applicant;
