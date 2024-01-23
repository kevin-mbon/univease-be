<<<<<<< HEAD
import express from "express";
import { registerApplicant } from "../controller/applicantController.js";
import { body } from "express-validator";
import fileUpload from "../helper/multer.js";
=======
import express from 'express';
import { registerApplicant,getAllApplicant,updateApplicant } from '../controller/applicantController.js';
import { body } from 'express-validator';
>>>>>>> 4b8ecdc (cleaning code)
// import { authMiddleware } from '../middleware/authMiddleware.js';



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

<<<<<<< HEAD
applicantRouter.post(
  "/register",
  fileUpload.single("profile"),
  registrationValidationRules,
  registerApplicant
);
=======
applicantRouter.post('/register',registrationValidationRules, registerApplicant);
applicantRouter.get('/', getAllApplicant);
applicantRouter.put('/update/:id',updateApplicant);
>>>>>>> 4b8ecdc (cleaning code)

// userRouter.get('/', authMiddleware, getAllUsers);

export default applicantRouter;
