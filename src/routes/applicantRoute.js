import express from 'express';
import { registerApplicant } from '../controller/applicantController';
import { body } from 'express-validator';
// import { authMiddleware } from '../middleware/authMiddleware.js';

const applicantRouter = express.Router();

const registrationValidationRules = [
    body('fname').trim().not().isEmpty().withMessage('First name is required.'),
    body('secname').trim().not().isEmpty().withMessage('Second name is required.'),
    body('email').trim().isEmail().withMessage('Invalid email address.'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match.');
        }
        return true;
    }),
    body('role').trim().isIn(['student', 'admin']).withMessage('Invalid type of user.'),
];

applicantRouter.post('/register',registrationValidationRules, registerApplicant);

// userRouter.get('/', authMiddleware, getAllUsers);

export default univRouter;