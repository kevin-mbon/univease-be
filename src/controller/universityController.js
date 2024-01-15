import jwt from 'jsonwebtoken';
import University from '../models/UniversityModel'
// Define the controller function to register a university
const registerUniversity = (req, res) => {
    // Extract the necessary data from the request body
    const { name, location, courses } = req.body;

    // Perform any necessary validation on the data

    // Create a new university object with the extracted data
    const university = {
        name,
        location,
        courses
    };

    // Generate a token for the registered university
    const token = jwt.sign({ university }, 'secretKey');

    // Save the university object to the database or perform any other necessary actions

    // Return a success response with the generated token
    res.status(200).json({ message: 'University registered successfully', university, token });
};

// Export the controller function
module.exports = {
    registerUniversity
};
