import jwt from "jsonwebtoken";

const generateToken = (user) => jwt.sign({ user }, process.env.JWT_SECRET);

export default generateToken;
