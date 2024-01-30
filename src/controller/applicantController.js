import generateToken from "../utils/tokenGeneretor.js";
import Applicant from "../models/ApplicantModel.js";
import { uploadToCloud } from "../helper/cloudinary.js";
import bcrypt from "bcrypt";
import { sendMail } from "../helper/nodeMailer.js";
import { validationResult } from "express-validator";
// Controller to register USER
export const registerApplicant = async (req, res) => {
  try {
    const {
      firstName,
      secondName,
      email,
      password,
      gender,
      dateOfBirth,
      highSchoolOrUniversity,
      graduationYear,
      gpaOrGrades,
      workExperience,
      uploadOption,
      contactInformation,
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

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
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
      gender,
      dateOfBirth,
      educationalBackground: {
        highSchoolOrUniversity,
        graduationYear,
        gpaOrGrades,
      },
      workExperience,
      lettersOfRecommendation: {
        uploadOption,
        contactInformation,
      },
      personalStatement,
      resume,
      portfolio,
      languageProficiency,
      financialInformation,
      preferredStartDate,
      applicationFeePayment,
      securityMeasures,
      termsAndConditions,
    });

    // Customize the email message
    const emailTemplate = {
      emailTo: email,
      subject: "Welcome to the UnivEase!",
      message: `<h1> Dear ${firstName}, </h1> 
                 <p> Welcome to the UnivEase! We're excited to have you on board.</p>
                 <p> Thank you for creating an account with us.</p>
`,
    };
    sendMail(emailTemplate);
    
    // Generate a token for the registered university
    const token = generateToken(applicant.id);
    return res.status(200).json({
      message: "Applicant registered successfully",
      applicant: {
        id: applicant._id,
        firstName,
        secondName,
        profile: result?.secure_url,
        email,
        gender,
        dateOfBirth,
        educationalBackground: {
          highSchoolOrUniversity,
          graduationYear,
          gpaOrGrades,
        },
        workExperience,
        lettersOfRecommendation: {
          uploadOption,
          contactInformation,
        },
        personalStatement,
        resume,
        portfolio,
        languageProficiency,
        financialInformation,
        preferredStartDate,
        applicationFeePayment,
        securityMeasures,
        termsAndConditions,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Your registeration failed",
      error: error.message,
    });
  }
};

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
