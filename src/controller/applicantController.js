import jwt from "jsonwebtoken";
import Applicant from "../models/ApplicantModel.js";
import { uploadToCloud } from "../helper/cloudinary.js";
import bcrypt from "bcrypt";
import { validationResult } from 'express-validator';
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

    const { highSchoolOrUniversity, graduationYear, gpaOrGrades } =
      educationalBackground;
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
  }

}

// export const getAll Applicant

export const getApplicant = async (req, res) => {
  try {
    const getAll = await Applicant.find();
    if (getAll) {
      return res.status(200).json({
        message: "All Applicant Retrived Successfull",
        data: getAll,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to Get All Applicant",
      error: error.message,
    });
  }
};
// single Applicant
export const getOneApplicant = async (req, res) => {
  try {
    const { id } = req.params;
    const getOne = await Applicant.findById(id);
    if (getOne) {
      return res.status(200).json({
        message: "Applicant Retrived Successfull",
        data: getOne,
      });
    } else {
      return res
        .status(404)
        .json({ status: "404", message: "Applicant Not Found" });
    }
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to Get Applicant",
      error: error.message,
    });
  }
};
// delete Applicant
export const deleteApplicant = async (req, res) => {
  try {
    const { id } = req.params;
    const getOne = await Applicant.findById(id);
    if (!getOne) {
      return res.status(404).json({
        message: "Applicant Not Found",
      });
    }
    const applicant = await Applicant.findByIdAndDelete(id);
    if (applicant) {
      return res.status(200).json({
        status: "200",
        message: "Applicant Deleted Well",
        data: applicant,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to Delete Applicant",
      error: error.message,
    });
  }
};


