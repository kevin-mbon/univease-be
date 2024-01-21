import jwt from "jsonwebtoken";
import { validationResult } from 'express-validator';
import Applicant from '../models/ApplicantModel.js'

// Controller to register USER  
export const registerApplicant = async (req, res) => {
  const {
    firstName,
    secondName,
    email,
    password,
    confirmPassword,
  } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

if (
    !firstName ||
    !secondName ||
    !email ||
    !password ||
    !confirmPassword
) {
    return res.status(400).json({ message: "All fields are required" });
} 

if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
}

// try {
// } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Your registeration failed", error });
// }

  try {
    const existingApplicant = await Applicant.findOne({ email });
    if (existingApplicant) {
      return res.status(400).json({ message: "Applicant already exists" });
    }

    let applicant = new Applicant({
        firstName,
        secondName,
        email,
        password,
        confirmPassword,
      });
      
    await applicant.save();

    // Generate a token for the registered university
    const token = jwt.sign({ applicant }, "secretKey");

    res.status(200).json({
      message: "Applicant registered successfully",
      applicant,
      token,
    });
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "Your registeration failed", error });
  }
};
