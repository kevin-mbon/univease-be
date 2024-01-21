import express from 'express';
import docrouter from '../documentation/swaggerDocs.js';
import univRouter from './universityRoute.js';
import applicantRouter from './applicantRoute.js';


const router = express.Router();

router.use('/university', univRouter);  
router.use('/docs', docrouter);
router.use('/user', applicantRouter);


export default router;
