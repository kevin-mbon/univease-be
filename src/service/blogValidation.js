import { body } from "express-validator";
const blogValidatorRules = [
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
export default blogValidatorRules;
