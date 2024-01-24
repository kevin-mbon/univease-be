import University from "../models/UniversityModel.js";
import generateToken from '../utils/tokenGeneretor.js';

export const createService = async (data) => {
    try{
        const {
            universityName,
            email,
            universityType,
            country,
            city,
            phoneNumber,
            password,
            confirmPassword,
          } = data;
    const existingUniversity = await University.findOne({ email });
    if (existingUniversity) {
          return new Error("University already exists");
      }     
    }catch (error){
        console.log(error);
     }
} 