<<<<<<< HEAD
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import Applicant from "../models/ApplicantModel.js";
import { uploadToCloud } from "../helper/cloudinary.js";
import bcrypt from "bcrypt";
// Controller to register USER
export const registerApplicant = async (req, res) => {
  try {
    const {
      firstName,
      secondName,
      email,
      password,
      confirmPassword,
      gender,
      dateOfBirth,
      educationalBackground,
      workExperience,
      lettersOfRecommendation,
      personalStatement,
      resume,
      portfolio,
      languageProficiency,
      financialInformation,
      preferredStartDate,
      applicationFeePayment,
      securityMeasures,
      termsAndConditions,
    } = req.body;

    const { highSchoolOrUniversity, graduationYear, gpaOrGrades } =   educationalBackground;
    const { englishProficiencyTest } = languageProficiency;
    const { twoFactorAuthentication } = securityMeasures;
    const { uploadOption, contactInformation } = lettersOfRecommendation;
    const { relevantExperience } = workExperience;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!firstName || !secondName || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingApplicant = await Applicant.findOne({
      email,
    });
    if (existingApplicant) {
      return res.status(400).json({ message: "Applicant already exists" });
    }
    let result;
    if (req.file) result = await uploadToCloud(req.file, res);
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    let applicant = await Applicant.create({
      firstName,
      secondName,
      profile: result?.secure_url,
      email,
      password: hashedPass,
      confirmPassword: hashedPass,
      gender,
      dateOfBirth,
      educationalBackground: {
        highSchoolOrUniversity,
        graduationYear,
        gpaOrGrades,
      },
      workExperience: {
        relevantExperience,
      },
      lettersOfRecommendation: {
        uploadOption,
        contactInformation,
      },
      personalStatement,
      resume,
      portfolio,
      languageProficiency: {
        englishProficiencyTest,
      },
      financialInformation,
      preferredStartDate,
      applicationFeePayment,
      securityMeasures: {
        twoFactorAuthentication,
      },
      termsAndConditions,
    });

    // Generate a token for the registered university
    const token = jwt.sign({ applicant }, "secretKey");
    return res.status(200).json({
      message: "Applicant registered successfully",
      applicant,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Your registeration failed",
      error: error.message,
    });
=======
import { validationResult } from 'express-validator';
import Applicant from '../models/ApplicantModel.js'
import { updateService,createService } from "../service/applicantService.js";
import generateToken from '../utils/tokenGeneretor.js';

// Controller to register USER  
export const registerApplicant = async (req, res) => {
 try{

  const create = await createService(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return new Error({ errors: errors.array() });
  }
  if (create instanceof Error) {
    return res.status(409).json({ message: create.message });
    }

    res.status(200).json({ message: "Applicant created successfully", user:create,token:generateToken(create)  });
 }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "Your registeration failed", error });
  }
};

// Controller to get all users
export const getAllApplicant = async (req, res) => {
  try {
    const applicants = await Applicant.find();
    return res.status(200).json({ success: true, data: applicants });
  } catch (err) {
    console.log("Error getting all Users", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}


// Controller to delete a single user
export const deleteApplicant = async (req, res) => {
  try {
      const applicant = await Applicant.findById(req.params.id);
      if (!applicant) {
          return res.status(404).json({ message: "Applicant not found" });
      }

      await applicant.remove();
      res.status(200).json({ message: "Applicant deleted successfully" });
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to delete applicant", error });
>>>>>>> 4b8ecdc (cleaning code)
  }
};
// Controller to update an existing user
export const updateApplicant = async (req, res) => {
  try {

    const update = await updateService(req.body,req.params.id);
    if (update instanceof Error) {
      return res.status(409).json({ message: update.message });
    }
    res.status(200).json({ message: "Applicant updated successfully", user:update });
    
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to update applicant", error });
  }
};  