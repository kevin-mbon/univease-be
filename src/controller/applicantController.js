import { validationResult } from 'express-validator';
import Applicant from '../models/ApplicantModel.js'
import { updateService,createService } from "../service/applicantService.js";
import generateToken from '../utils/tokenGeneretor.js';

// Controller to register USER  
export const registerApplicant = async (req, res) => {
 try{

  const create = await createService(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return new Error({ errors: errors.array() });
  }
  if (create instanceof Error) {
    return res.status(409).json({ message: create.message });
    }

    res.status(200).json({ message: "Applicant created successfully", user:create,token:generateToken(create)  });
 }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "Your registeration failed", error });
  }
};

// Controller to get all users
export const getAllApplicant = async (req, res) => {
  try {
    const applicants = await Applicant.find();
    return res.status(200).json({ success: true, data: applicants });
  } catch (err) {
    console.log("Error getting all Users", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}


// Controller to delete a single user
export const deleteApplicant = async (req, res) => {
  try {
      const applicant = await Applicant.findById(req.params.id);
      if (!applicant) {
          return res.status(404).json({ message: "Applicant not found" });
      }

      await applicant.remove();
      res.status(200).json({ message: "Applicant deleted successfully" });
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to delete applicant", error });
  }
};
// Controller to update an existing user
export const updateApplicant = async (req, res) => {
  try {

    const update = await updateService(req.body,req.params.id);
    if (update instanceof Error) {
      return res.status(409).json({ message: update.message });
    }
    res.status(200).json({ message: "Applicant updated successfully", user:update });
    
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to update applicant", error });
  }
};  