import express from 'express';
import { registerUniversity } from '../controller/universityController.js';
import { body } from 'express-validator';
// import { authMiddleware } from '../middleware/authMiddleware.js';

const univRouter = express.Router();

// const registrationValidationRules = [
//     body('name').trim().not().isEmpty().withMessage('University name is required.'),
//     body('email').trim().isEmail().withMessage('Invalid email address.'),
//     body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
//     body('confirmPassword').custom((value, { req }) => {
//         if (value !== req.body.password) {
//             throw new Error('Passwords do not match.');
//         }
//         return true;
//     }),
//     body('type').trim().isIn(['private', 'public', 'semiPublic']).withMessage('Invalid type of university.'),
// ];

univRouter.post('/register', registerUniversity);

// userRouter.get('/', authMiddleware, getAllUsers);

export default univRouter;