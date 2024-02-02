import expres from "express";
import { blogValidatorRules } from "../service/Validation";
import fileUpload from "../helper/multer";
import Authorization from "../middleware/UniversitymiddleWare.js";
import {
  createPost,
  deletePost,
  getPost,
  getSinglePost,
  updatePost,
} from "../controller/blogController";
const blogRouter = expres.Router();

blogRouter.post(
  "/create",
  fileUpload.single("postImage"),
  Authorization,
  blogValidatorRules,
  createPost
);
blogRouter.get("/read", getPost);
blogRouter.get("/read/:id", getSinglePost);
blogRouter.delete("/delete/:id", Authorization, deletePost);
blogRouter.put(
  "/update/:id",
  fileUpload.single("postImage"),
  Authorization,
  updatePost
);
export default blogRouter;
