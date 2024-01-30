import express from "express";
import fileUpload from "../helper/multer";
import { createProgram } from "../controller/programController";
import { programValidationRules } from "../service/Validation";
import Authorization from "../middleware/UniversitymiddleWare";
const programRouter = express.Router();

programRouter.post(
  "/create",
  fileUpload.single("files"),
  programValidationRules(),
  Authorization,
  createProgram
);

export default programRouter;
