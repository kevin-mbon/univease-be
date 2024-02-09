import mongoose from "mongoose";
const applicationSchema = new mongoose.Schema(
  {
    program: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
      require: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Applicant",
      require: true,
    },
    startingDate: {
      type: String,
    },
    coverLetter: {
      type: String,
    },
    attachement: {
      type: String,
    },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);
export default Application;
