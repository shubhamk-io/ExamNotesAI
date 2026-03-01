import { Response } from "express";
import UserModel from "../models/user.model.js";
import { AuthRequest } from "../middleware/isAuth.js";

export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await UserModel.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: `getCurrentUser Error: ${error}` });
  }
};