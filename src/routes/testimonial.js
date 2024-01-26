import express from "express";
import Authorization from "../middleware/ApplicantMiddleWare";
import fileUpload from "../helper/multer";
import {
  createTestMonial,
  getTestimonial,
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

testmonialRouter.get("/read", Authorization, getTestimonial);
export default testmonialRouter;
