import express from "express";
import { registerUniversity } from "../controller/universityController.js";
import fileUpload from "../helper/multer.js";
import { loginUniversity } from "../controller/authController.js";
import { registrationValidationRules } from "../service/Validation.js";
import { universityloginValidationRules } from "../service/authValidation.js";

const univRouter = express.Router();

univRouter.post(
  "/register",
  fileUpload.single("universityLogo"),
  registrationValidationRules,
  registerUniversity
);

univRouter.post(
  "/auth",
  fileUpload.single("file"),
  universityloginValidationRules(),
  loginUniversity
);

export default univRouter;
