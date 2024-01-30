import mongoose from "mongoose";
const programSchema = new mongoose.Schema(
  {
    campus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
    },
    tuitionAndFees: {
      registration: {
        type: String,
        required: true,
      },
      scholarship: {
        type: String,
      },
      hostel: {
        type: String,
      },
    },
    degree: {
      type: String,
    },
    degreeOverview: {
      type: String,
    },
    components: {
      type: [String],
    },
    programExtension: {
      wayTolearn: {
        type: String,
      },
      related: {
        type: [String],
      },
    },
  },
  { timestamps: true }
);

const program = mongoose.model("Program", programSchema);

export default program;
