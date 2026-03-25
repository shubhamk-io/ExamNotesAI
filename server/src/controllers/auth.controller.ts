import { Request, Response } from "express";
import UserModel from "../models/user.model.js";
import { getToken } from "../utils/token.js";




export const googleAuth = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    let user = await UserModel.findOne({ email });
    if (!user) {
      user = await UserModel.create({ name, email });
    }


    const token = await getToken(user._id.toString());

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,        // MUST TRUE (HTTPS)
      sameSite: "none",    // MUST NONE (cross-site)
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: `Google signup Error: ${error}` });
  }
};

// Logout
export const logOutUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    res.status(500).json({ message: "Logout Error" });
  }
};