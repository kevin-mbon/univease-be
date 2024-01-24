import Applicant from "../models/ApplicantModel.js";
import University from "../models/UniversityModel.js";
import generateToken from '../utils/tokenGeneretor.js'


// Controller to login a user
export const loginApplicant = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
        const existingApplicant = await Applicant.findOne({ email });
        if (!existingApplicant) {
            return res.status(400).json({ message: "Applicant does not exist" });
        }
  
        if (password !== existingApplicant.password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
  
        // Generate a token for the logged in user
        const token = generateToken(existingApplicant);
  
        res.status(200).json({
            message: "Applicant logged in successfully",
            existingApplicant,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to login applicant", error });
    }
  };
  
  // Controller to login a university
export const loginUniversity = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      const existingUniversity = await University.findOne({ email });
      if (!existingUniversity) {
        return res.status(400).json({ message: "University does not exist" });
      }
  
      if (password !== existingUniversity.password) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Generate a token for the registered university
      const token = generateToken(existingUniversity);
  
      res.status(200).json({
        message: "University logged in successfully",
        existingUniversity,
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to login university", error });
    }
  };