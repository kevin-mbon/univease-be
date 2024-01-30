import express from "express";
import docrouter from "../documentation/swaggerDocs.js";
import univRouter from "./universityRoute.js";
import applicantRouter from "./applicantRoute.js";
import blogRouter from "./blogRoutes.js";
import testmonialRouter from "./testimonial.js";
import programRouter from "./program.js";
const router = express.Router();

router.use("/university", univRouter);
router.use("/docs", docrouter);
router.use("/user", applicantRouter);
router.use("/blog", blogRouter);
router.use("/testmonial", testmonialRouter);
router.use("/program", programRouter);

export default router;
