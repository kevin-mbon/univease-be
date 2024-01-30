import mongoose from "mongoose";

const universitySchema = new mongoose.Schema(
  {
    universityName: {
      type: String,
      required: false,
    },
    country: { type: String, required: false },
    city: { type: String, required: false },
    phoneNumbers: { type: Number, required: false },
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
      required: false,
    },
    accreditation: {
      type: String,
    },
    description: {
      type: String,
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
      required: false,
    },
    securityMeasures: {
      twoFactorAuthentication: {
        type: Boolean,
      },
    },
    verificationProcess: {
      type: String,
    },
  },
  { timestamps: true }
);

const University = mongoose.model("University", universitySchema);

export default University;
