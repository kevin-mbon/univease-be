import Application from "../models/applicationModel.js";
import { uploadToCloud } from "../helper/cloudinary";
import { validationResult } from "express-validator";


const applicationForm = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { program, name, email, phoneNumber, time, coverLetter, attachement } =
      req.body;
   
    let result;
    if (req.file) result = await uploadToCloud(req.file, res);
    const form = await Application.create({
      coverLetter: result?.secure_url,
      attachement: result?.secure_url,
      program: req.University._id,
      time,
      name,
      email,
      phoneNumber,
    });
    if (form) {
      return res.status(200).json({
        status: "200",
        message: "Application Created Successfully",
        data: saveApplication,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed To Create Application",
      error: error.message,
    });
  }
}

export default applicationForm;