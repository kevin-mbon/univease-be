import express from "express";
import {changeStatus} from "../controller/authController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";
const adminRouter = express.Router();

adminRouter.post("/assign-status/:id",authMiddleware, changeStatus);

export default adminRouter;