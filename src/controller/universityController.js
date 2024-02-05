import generateToken from "../utils/tokenGeneretor.js";
import { validationResult } from "express-validator";
import University from "../models/UniversityModel.js";
import { uploadToCloud } from "../helper/cloudinary.js";
import bcrypt from "bcrypt";
import { sendMail } from "../helper/nodeMailer.js";

// Controller to register a university
export const registerUniversity = async (req, res) => {
  try {
    const {
      universityName,
      universityType,
      email,
      description,
      password,
      city,
      country,
      phoneNumbers,
      websiteURL,
      programsOffered,
      applicationRequirements,
      applicationDeadline,
      tuitionAndFees,
      name,
      contactDetails,
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

    const existingUniversity = await University.findOne({
      universityName,
    });

    if (existingUniversity) {
      return res.status(400).json({ message: "University already exists" });
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
      universityType,
      email,
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
      city,
      country,
      phoneNumbers,
    });
    // Generate a token for the registered university
    const token = generateToken(university.id);
    // Customize the email message
    const emailTemplate = {
      emailTo: email,
      subject: "Welcome to the UnivEase!",
      message: `<h1> Dear ${universityName}, </h1> 
                 <p> Welcome to the UnivEase! We're excited to have you on board.</p>
                 <p> Thank you for creating an account with us.</p>
`,
    };
    sendMail(emailTemplate);
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

// Controller to get all universities
export const getAllUniversities = async (req, res) => {
  try {
    const universities = await University.find();
    res.status(200).json({ success: true, data: universities });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get universities", error });
  }
};

// Controller to get a university by id
export const getUniversityById = async (req, res) => {
  const { id } = req.params;
  try {
    const university = await University.findById(id);
    res.status(200).json({ success: true, data: university });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get university", error });
  }
};

// Controller to update a university
export const updateUniversity = async (req, res) => {
  const { id } = req.params;
  const {
    universityName,
    email,
    universityType,
    country,
    city,
    phoneNumber,
    password,
    confirmPassword,
  } = req.body;
  try {
    const university = await University.findById(id);
    if (!university) {
      return res.status(400).json({ message: "University does not exist" });
    }

    university.universityName = universityName;
    university.email = email;
    university.universityType = universityType;
    university.country = country;
    university.city = city;
    university.phoneNumbers = phoneNumber;
    university.password = password;
    university.confirmPassword = confirmPassword;

    await university.save();

    res.status(200).json({ message: "University updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update university", error });
  }
};

// Controller to delete a university
export const deleteUniversity = async (req, res) => {
  const { id } = req.params;
  try {
    const university = await University.findById(id);
    if (!university) {
      return res.status(400).json({ message: "University does not exist" });
    }

    await University.findByIdAndDelete(id);

    res.status(200).json({ message: "University deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete university", error });
  }
};
