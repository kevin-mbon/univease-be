import mongoose from "mongoose";

const universitySchema = new mongoose.Schema({
  universityName: {
    type: String,
    required: true,
  },
<<<<<<< HEAD
=======
  country: { type: String, required: true },
  city: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
>>>>>>> 4b8ecdc (cleaning code)
  universityLogo: {
    type: String,
  },
  contactInformation: {
    address: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    emailAddress: {
      type: String,
    },
  },
  websiteURL: {
    type: String,
  },
  universityType: {
    type: String,
    required: true,
  },
  accreditation: {
    type: String,
  },
  description: {
<<<<<<< HEAD
    type: String,
    required: true,
=======
    type: String
>>>>>>> 4b8ecdc (cleaning code)
  },
  programsOffered: {
    type: [String],
  },
  applicationRequirements: {
    type: String,
  },
  applicationDeadline: {
    type: Date,
  },
  tuitionAndFees: {
    type: String,
  },
  admissionsContact: {
    name: {
      type: String,
    },
    contactDetails: {
      type: String,
    },
  },
  socialMediaLinks: {
    type: [String],
  },
  termsAndConditions: {
    type: Boolean,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  securityMeasures: {
    twoFactorAuthentication: {
      type: Boolean,
    },
  },
  verificationProcess: {
    type: String,
  },
});

const University = mongoose.model("University", universitySchema);

export default University;
