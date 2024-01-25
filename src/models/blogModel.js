import mongoose from "mongoose";
const blogSchema = new mongoose.Schema(
  {
    postImage: {
      type: String,
      require: true,
    },
    postTitle: {
      type: String,
      require: true,
    },
    postContent: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
const blog = mongoose.model("blog", blogSchema);
export default blog;
