import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({});
const blog = mongoose.model("blog", blogSchema);
export default blog;
