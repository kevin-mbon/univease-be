import testmonial from "../models/TestimonialModel";
import { validationResult } from "express-validator";
export const createTestMonial = async (req, res) => {
  try {
    const { post, location } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const makeTestmonial = await testmonial.create({
      post,
      location,
      author: req.Applicant._id,
    });

    if (makeTestmonial) {
      return res.status(201).json({
        status: "201",
        message: "TestMonial Created  Successfully",
        data: makeTestmonial,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed To Create TestMonial",
      error: error.message,
    });
  }
};

// getAll dat

export const getTestimonial = async (req, res) => {
  try {
    const result = await testmonial.find().populate({
      path: "author",
      select: "profile firstName secondName",
    });

    if (result) {
      return res.status(200).json({
        status: "200",
        message: "All TestMonial Retrieved Well",
        data: result,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed To Retrieve TestMonial",
      error: error.message,
    });
  }
};
export const getOneTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await testmonial.findById(id).populate({
      path: "author",
      select: "profile firstName secondName",
    });

    if (result) {
      return res.status(200).json({
        status: "200",
        message: "TestMonial Retrieved Well",
        data: result,
      });
    } else {
      return res.status(404).json({
        status: "404",
        message: "TestMonial Not Found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed To Retrieve TestMonial",
      error: error.message,
    });
  }
};
export const DeleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await testmonial.findById(id);
    if (!result) {
      return res.status(404).json({
        status: "404",
        message: "TestMonial Not Found",
      });
    }
    await testmonial.findByIdAndDelete(id);
    return res.status(200).json({
      status: "200",
      message: "TestMonial Deleted Well",
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed To Retrieve TestMonial",
      error: error.message,
    });
  }
};

export const updateTestMonial = async (req, res) => {
  try {
    const { post, location } = req.body;
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const result = await testmonial.findById(id);
    if (!result) {
      return res.status(404).json({
        status: "404",
        message: "TestMonial Not Found",
      });
    }
    const updateTestmonial = await testmonial.findByIdAndUpdate(id, {
      post,
      location,
      author: req.Applicant._id,
    });

    if (updateTestmonial) {
      return res.status(201).json({
        status: "201",
        message: "TestMonial Updated  Successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed To Create TestMonial",
      error: error.message,
    });
  }
};
