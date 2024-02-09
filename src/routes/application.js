import express from "express";
import Authorization from "../middleware/ApplicantMiddleWare";
import {
  applicationForm,
  getApplication,
  getOneApplication,
  getOneApplicationById,
} from "../controller/applicationController.js";
import fileUpload from "../helper/multer";

const applicationRouter = express.Router();

applicationRouter.post(
  "/apply/:id",
  fileUpload.single("attachment"),
  Authorization,
  applicationForm
);
applicationRouter.get("/all", getApplication);
applicationRouter.get("/oneProgram/:program", getOneApplication);
applicationRouter.get("/one/:id", getOneApplicationById);

export default applicationRouter;
