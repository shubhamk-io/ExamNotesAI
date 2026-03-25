import jwt from "jsonwebtoken";


export const getToken = async (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET , 
    { expiresIn: "7d" }
  );
};