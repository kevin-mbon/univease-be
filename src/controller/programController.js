import program from "../models/program";
import { uploadToCloud } from "../helper/cloudinary";
import { validationResult } from "express-validator";
export const createProgram = async (req, res) => {
  try {
    const {
      name,
      tags,
      registration,
      scholarship,
      hostel,
      degree,
      degreeOverview,
      components,
      wayTolearn,
      related,
    } = req.body;
    const existingName = await program.findOne({
      name,
    });

    if (existingName) {
      return res.status(400).json({ message: "Program already exists" });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let result;
    if (req.file) result = await uploadToCloud(req.file, res);

    const makeProgram = await program.create({
      name,
      campus: req.University._id,
      tags,
      tuitionAndFees: { registration, scholarship, hostel },
      degree,
      degreeOverview,
      components,
      programImage: result?.secure_url,
      programExtension: { wayTolearn, related },
    });
    return res.status(201).json({
      status: "201",
      message: "Program Created Well",
      data: makeProgram,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500",
      message: "Failed to create Program",
      error: error.message,
    });
  }
};

// getALL program
export const getProgram = async (req, res) => {
  try {
    const getALL = await program.find().populate({
      path: "campus",
      select: "universityName universityLogo country city",
    });
    return res.status(201).json({
      status: "200",
      message: "Program Retrived Well",
      data: getALL,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500",
      message: "Failed to Retrived Program",
      error: error.message,
    });
  }
};
// getALL program
export const getOneProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const findId = await program.findById(id);
    if (!findId) {
      return res.status(404).json({
        status: "404",
        message: "Program ID Not Found",
      });
    }
    const getALL = await program.findById(id).populate({
      path: "campus",
      select: "universityName universityLogo country city",
    });
    return res.status(201).json({
      status: "200",
      message: "Program Retrived Well",
      data: getALL,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500",
      message: "Failed to Retrived Program",
      error: error.message,
    });
  }
};
export const deleteProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const findId = await program.findById(id);
    if (!findId) {
      return res.status(404).json({
        status: "404",
        message: "Program ID Not Found",
      });
    }
    await program.findByIdAndDelete(id);
    return res.status(200).json({
      status: "200",
      message: "Program Delted Well",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500",
      message: "Failed to Delete Program",
      error: error.message,
    });
  }
};

export const updateProgram = async (req, res) => {
  try {
    const {
      name,
      tags,
      registration,
      scholarship,
      hostel,
      degree,
      degreeOverview,
      components,
      wayTolearn,
      related,
    } = req.body;
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const findId = await program.findById(id);
    if (!findId) {
      return res.status(404).json({
        status: "404",
        message: "Program Not Found",
      });
    }
    let result;
    if (req.file) result = await uploadToCloud(req.file, res);

    await program.findByIdAndUpdate(id, {
      name,
      campus: req.University._id,
      tags,
      tuitionAndFees: { registration, scholarship, hostel },
      degree,
      degreeOverview,
      programImage: result?.secure_url,
      components,
      programExtension: { wayTolearn, related },
    });

    return res.status(201).json({
      status: "201",
      message: "Program Updated Well",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500",
      message: "Failed to Update Program",
      error: error.message,
    });
  }
};
