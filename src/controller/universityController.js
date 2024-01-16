import jwt from "jsonwebtoken";
import { validationResult } from 'express-validator';
import University from "../models/UniversityModel.js";

// Controller to register a university
export const registerUniversity = async (req, res) => {
  const {
    universityName,
    email,
    universityType,
    description,
    password,
    confirmPassword,
  } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

if (
    !universityName ||
    !email ||
    !universityType ||
    !description ||
    !password ||
    !confirmPassword
) {
    return res.status(400).json({ message: "All fields are required" });
} 

if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
}

try {
} catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to register university", error });
}

  try {
    const existingUniversity = await University.findOne({ email });
    if (existingUniversity) {
      return res.status(400).json({ message: "University already exists" });
    }

    let university = new University({
        universityName,
        email,
        description,
        password,
        confirmPassword,
        universityType, 
      });
      
    await university.save();

    // Generate a token for the registered university
    const token = jwt.sign({ university }, "secretKey");

    res.status(200).json({
      message: "University registered successfully",
      university,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to register university", error });
  }
};
