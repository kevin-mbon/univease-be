import { body, check } from "express-validator";
export const blogValidatorRules = [
  body("file").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("postImage is required.");
    }
    return true;
  }),
  body("postTitle")
    .trim()
    .not()
    .isEmpty()
    .withMessage("postTitle is required."),
  body("postContent")
    .trim()
    .not()
    .isEmpty()
    .withMessage("postContent is required."),
];

export const registrationValidationRules = [
  body("universityName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("University name is required."),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match.");
    }
    return true;
  }),
  body("universityType")
    .trim()
    .isIn(["private", "public", "semiPublic"])
    .withMessage("Invalid type of university."),
];

// testimonial

export const testmonialValidationRule = () => {
  return [
    check("post").notEmpty().withMessage("Content Required"),
    check("location").notEmpty().withMessage("Campus Required"),
  ];
};
