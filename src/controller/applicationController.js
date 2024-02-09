import Application from "../models/applicationModel.js";
import { uploadToCloud } from "../helper/cloudinary";
import { validationResult } from "express-validator";
import program from "../models/program";
export const applicationForm = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { startingDate, coverLetter } = req.body;
    const { id } = req.params;

    const findId = await program.findById(id);
    if (!findId) {
      return res.status(404).json({
        status: "404",
        message: "Program Id Not Found",
      });
    }
    let result;
    if (req.file) result = await uploadToCloud(req.file, res);
    const form = await Application.create({
      coverLetter,
      attachement: result?.secure_url,
      startingDate,
      applicant: req.Applicant._id,
      program: findId._id,
    });
    if (form) {
      return res.status(200).json({
        status: "201",
        message: "Application Created Successfully",
        data: form,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500",
      message: "Failed To Create Application",
      error: error.message,
    });
  }
};

//endpoint to get all application
export const getApplication = async (req, res) => {
  try {
    const findApplication = await Application.find()
      .populate({
        path: "applicant",
        select: "profile firstName secondName",
      })
      .populate({ path: "program", select: "name" });
    if (findApplication) {
      return res.status(200).json({
        status: "200",
        message: "All Application Retrived Well",
        data: findApplication,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed To Retrive Application",
      error: error.message,
    });
  }
};

//endpoint to get a application of a particular program
export const getOneApplication = async (req, res) => {
  try {
    const { program } = req.params;
    const findApplication = await Application.find({ program: program._id });
    if (findApplication) {
      return res.status(200).json({
        status: "200",
        message: "Application Retrived Well",
        data: findApplication,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed To Retrive Application",
      error: error.message,
    });
  }
};

//endpoint to get one application by id
export const getOneApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const findApplication = await Application.findById(id)
      .populate({
        path: "applicant",
        select: "profile firstName secondName",
      })
      .populate({ path: "program", select: "name" });
    if (findApplication) {
      return res.status(200).json({
        status: "200",
        message: "Application Retrived Well",
        data: findApplication,
      });
    } else {
      return res.status(404).json({
        status: "404",
        message: "Application Not Found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500",
      message: "Failed To Retrive Application",
      error: error.message,
    });
  }
};
