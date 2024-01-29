import express from "express";
import Authorization from "../middleware/ApplicantMiddleWare";
import fileUpload from "../helper/multer";
import {
  DeleteTestimonial,
  createTestMonial,
  getOneTestimonial,
  getTestimonial,
  updateTestMonial,
} from "../controller/TestimonialController";
import { testmonialValidationRule } from "../service/Validation";
const testmonialRouter = express.Router();

testmonialRouter.post(
  "/create",
  fileUpload.single("file"),
  testmonialValidationRule(),
  Authorization,
  createTestMonial
);

testmonialRouter.get("/read", getTestimonial);
testmonialRouter.get("/read/:id", getOneTestimonial);
testmonialRouter.delete("/delete/:id", DeleteTestimonial);
testmonialRouter.put(
  "/update/:id",
  fileUpload.single("file"),
  testmonialValidationRule(),
  Authorization,
  updateTestMonial
);

export default testmonialRouter;
