import express from "express";
import {
  loginApplicant,logoutApplicant,
  // loginValidationRules,
} from "../controller/authController.js";
import { authMiddleware } from '../middleware/authMiddleware.js'
import { body } from "express-validator";
import {
  deleteApplicant,
  getApplicant,
  getOneApplicant,
  registerApplicant,
  updateApplicant
} from "../controller/applicantController.js";
import fileUpload from "../helper/multer.js";
import { loginValidationRules } from "../service/authValidation.js";
import Authorization from "../middleware/ApplicantMiddleWare.js";
const applicantRouter = express.Router();

const registrationValidationRules = [
  body("firstName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("First name is required."),
  body("secondName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Second name is required."),
  body("email").trim().isEmail().withMessage("Invalid email address."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match.");
    }
    return true;
  }),
];

applicantRouter.post(
  "/register",
  fileUpload.single("profile"),
  registrationValidationRules,
  registerApplicant
);

applicantRouter.post(
  "/auth",
  fileUpload.single("file"),
  loginValidationRules(),
  loginApplicant
);
applicantRouter.post("/auth/logout", authMiddleware,logoutApplicant);
applicantRouter.get("/read", getApplicant);
applicantRouter.get("/read/:id", getOneApplicant);
applicantRouter.put("/update/:id", updateApplicant);
applicantRouter.delete("/delete/:id", deleteApplicant);

export default applicantRouter;
