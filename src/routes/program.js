import express from "express";
import fileUpload from "../helper/multer";
import {
  createProgram,
  deleteProgram,
  getOneProgram,
  getProgram,
  updateProgram,
} from "../controller/programController";
import { programValidationRules } from "../service/Validation";
import Authorization from "../middleware/UniversitymiddleWare";
const programRouter = express.Router();

programRouter.post(
  "/create",
  fileUpload.single("programImage"),
  programValidationRules(),
  Authorization,
  createProgram
);
programRouter.put(
  "/update/:id",
  fileUpload.single("programImage"),
  programValidationRules(),
  Authorization,
  updateProgram
);

programRouter.get("/read", getProgram);
programRouter.get("/read/:id", getOneProgram);
programRouter.delete("/delete/:id", Authorization, deleteProgram);

export default programRouter;
