import program from "../models/program";
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

    const makeProgram = await program.create({
      name,
      campus: req.University._id,
      tags,
      tuitionAndFees: { registration, scholarship, hostel },
      degree,
      degreeOverview,
      components,
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
