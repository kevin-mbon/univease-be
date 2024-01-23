import  jwt from "jsonwebtoken";

const generateToken = (user) => jwt.sign({user},process.env.SECRET_KEY)

export default generateToken;

