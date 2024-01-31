import jwt from 'jsonwebtoken'
import BlacklistedToken from "../models/blackListedToken.js";
export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Not Authenticated! no token provided." });
    }
  
    const token = authHeader.split(" ")[1];
    const blacklistedToken = await BlacklistedToken.findOne({ token });
  
    if (blacklistedToken) {
      return res.status(401).json({ error: "Token is blacklisted. Please log in again." });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err.message);
        return res
          .status(401)
          .json({ message: "Not Authorized! Invalid token." });
      }
  
      // Store the decoded token in the request for use in other routes if needed
      // req.session.token = decoded;
  
      next();
    });
  };