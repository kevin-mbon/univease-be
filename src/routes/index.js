import express from 'express';
import docrouter from '../documentation/swaggerDocs.js';
import univRouter from './universityRoute.js';


const router = express.Router();

router.use('/university', univRouter);  
router.use('/docs', docrouter)


export default router;
