import express from "express";
import docrouter from "../documentation/swaggerDocs.js";
import univRouter from "./universityRoute.js";
import applicantRouter from "./applicantRoute.js";
import blogRouter from "./blogRoutes.js";
import testmonialRouter from "./testimonial.js";
import programRouter from "./program.js";
import adminRouter from "./admin.js";
import applicationRouter from "./application.js";
const router = express.Router();

router.use("/university", univRouter);
router.use("/docs", docrouter);
router.use("/user", applicantRouter);
router.use("/blog", blogRouter);
router.use("/testmonial", testmonialRouter);
router.use("/program", programRouter);
router.use("/admin", adminRouter);
router.use("/applications", applicationRouter);

export default router;
