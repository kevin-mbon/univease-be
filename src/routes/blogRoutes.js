import expres from "express";
import blogValidatorRules from "../service/blogValidation";
import fileUpload from "../helper/multer";
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
  blogValidatorRules,
  createPost
);
blogRouter.get("/read", getPost);
blogRouter.get("/read/:id", getSinglePost);
blogRouter.delete("/delete/:id", deletePost);
blogRouter.put("/update/:id", updatePost);
export default blogRouter;
