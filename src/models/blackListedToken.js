import mongoose from "mongoose";

const blacklistedTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: "1h", // Set the expiration time for the document (1 hour)
    },
  },
  { timestamps: true }
);

const BlacklistedToken = mongoose.model("BlacklistedToken", blacklistedTokenSchema);

export default BlacklistedToken;