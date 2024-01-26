import mongoose from "mongoose";

const testMonialSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Applicant",
      require: true,
    },
    post: {
      type: String,
      require: true,
    },
    location: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const testmonial = mongoose.model("testmonial", testMonialSchema);
export default testmonial;
