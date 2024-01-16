import express from 'express';
import univRouter from './universityRoute.js';


const router = express.Router();

router.use('/university', univRouter);  


export default router;
