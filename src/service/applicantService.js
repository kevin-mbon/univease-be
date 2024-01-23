import Applicant from "../models/ApplicantModel.js";
import { validationResult } from 'express-validator';

  export const updateService = async (data,id)=>{
    try {
    const { firstName, secondName, country, city, phoneNumber, email } = data;
    const applicant = await Applicant.findById(id);
    if (!applicant) {
        return new Error({ message: "Applicant not found", status:"409" });
    }

    applicant.firstName = firstName || applicant.firstName;
    applicant.secondName = secondName || applicant.secondName;
    applicant.country = country || applicant.country;
    applicant.city = city || applicant.city;
    applicant.phoneNumber = phoneNumber || applicant.phoneNumber;
    applicant.email = email || applicant.email;

    await applicant.save();
    return applicant;

} catch (error) {
        console.log(error);
}
}

// Service to create a user
export const createService = async (data) => {
  try {
    const {
      firstName,
      secondName,
      country,
      city,
      password,
      phoneNumber,
      email
    } = data;
   
    const existingApplicant = await Applicant.findOne({ email });
    if (existingApplicant) {
      return new Error("Applicant already exists");
    }
    const applicant = await Applicant.create({
      firstName,
      secondName,
      country,
      city,
      password,
      phoneNumber,
      email
    });
    
    return applicant;
    
  } catch (error)  {
    throw new Error(error)
    console.log(error);
  }
};
  