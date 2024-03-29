import Applicant from "../models/ApplicantModel";
import University from "../models/UniversityModel.js";
import generateToken from "../utils/tokenGeneretor.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import BlacklistedToken from "../models/blackListedToken.js";
export const loginApplicant = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    if (!email) {
      return res.status(422).json({
        message: "Email Required",
      });
    }

    const userLogin = await Applicant.findOne({ email });

    if (!userLogin) {
      return res.status(422).json({
        message: "Applicant not found",
      });
    }

    const isMatch = await bcrypt.compare(password, userLogin.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    // Generate a token for the logged-in user
    const token = generateToken(userLogin._id);

    return res.status(200).json({
      message: "Applicant logged in successfully",
      data: userLogin,
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to login applicant", error: error.message });
  }
};

// University Login
export const loginUniversity = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const userLogin = await University.findOne({ email });

    if (!userLogin) {
      return res.status(422).json({
        message: "Invalid Credential",
      });
    }

    const isMatch = await bcrypt.compare(password, userLogin.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    // Generate a token for the logged-in user
    const token = generateToken(userLogin._id);

    return res.status(200).json({
      message: "University logged in successfully",
      data: userLogin,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to login University",
      error: error.message,
    });
  }
};
export const logoutApplicant = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  // Add the token to the blacklist
  if (token) {
    await BlacklistedToken.create({ token });
  }

  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Error while logging out." });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully." });
  });
};

export const logoutUniversity = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  // Add the token to the blacklist
  if (token) {
    console.log(token);
    await BlacklistedToken.create({ token });
  }

  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Error while logging out." });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully." });
  });
};
// university changing status endpoint
export const changeStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const existingUniversity = await University.findById(id);
    if (!existingUniversity) {
      return res.status(404).json({ message: "University not found" });
    }

    const university =
      existingUniversity.status != "Approved"
        ? await University.findByIdAndUpdate(id, { status: "Approved" })
        : await University.findByIdAndUpdate(id, { status: "cancelled" });
    res.json({ message: "Status changed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to change status", error });
  }
};
