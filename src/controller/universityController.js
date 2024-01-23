import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import University from "../models/UniversityModel.js";
import { uploadToCloud } from "../helper/cloudinary.js";
import bcrypt from "bcrypt";
// Controller to register a university
export const registerUniversity = async (req, res) => {
  try {
    const {
      universityName,
      universityType,
      description,
      password,
      confirmPassword,
      contactInformation,
      websiteURL,
      programsOffered,
      applicationRequirements,
      applicationDeadline,
      tuitionAndFees,
      admissionsContact,
      socialMediaLinks,
      termsAndConditions,
      username,
      securityMeasures,
      verificationProcess,
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (
      !universityName ||
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


    const { address, phoneNumber, emailAddress } = contactInformation;

    // Check if all contactInformation fields are provided
    if (!address || !phoneNumber || !emailAddress) {
      return res
        .status(400)
        .json({ message: "Complete contact information is required" });
    }

    const { name, contactDetails } = admissionsContact;

    // Check if all admissionsContact fields are provided
    if (!name || !contactDetails) {
      return res
        .status(400)
        .json({
          message: "Complete admissions contact information is required",
        });
    }
    const existingUniversity = await University.findOne({
      universityName,
    });

    if (existingUniversity) {
      return res.status(400).json({ message: "University already exists" });
    }

    const existingEmail = await University.findOne({
      "contactInformation.emailAddress": emailAddress,
    });

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    let result;
    if (req.file) result = await uploadToCloud(req.file, res);
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    let university = await University.create({
      universityName,
      universityLogo: result?.secure_url,
      description,
      password: hashedPass,
      confirmPassword: hashedPass,
      universityType,
      contactInformation: {
        address,
        phoneNumber,
        emailAddress,
      },
      admissionsContact: {
        name,
        contactDetails,
      },
      websiteURL,
      programsOffered,
      applicationRequirements,
      applicationDeadline,
      tuitionAndFees,
      socialMediaLinks,
      termsAndConditions,
      username,
      securityMeasures,
      verificationProcess,
    });
    // Generate a token for the registered university
    const token = jwt.sign({ university }, "secretKey");

    return res.status(200).json({
      message: "University registered successfully",
      university,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to register university",
      error: error.message,
    });
  }
};
