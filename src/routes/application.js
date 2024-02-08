import express from "express";
import applicationForm from '../controller/applicationController.js';
import fileUpload from "../helper/multer";

const applicationRouter = express.Router();

applicationRouter.post('/apply',fileUpload.single("coverLetter"),
 applicationForm);

export default applicationRouter;