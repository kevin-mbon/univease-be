import { check } from "express-validator";

export const loginValidationRules = () => {
  return [
    check("email")
      .optional({ checkFalsy: true }) // Allows an empty email
      .isEmail()
      .withMessage("Invalid email format"),
    check("password").notEmpty().withMessage("Password is required"),
  ];
};

export const universityloginValidationRules = () => {
  return [
    check("username").not().isEmpty().withMessage("Username Required"),
    check("password").notEmpty().withMessage("Password is required"),
  ];
};
