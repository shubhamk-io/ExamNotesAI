import UserModel from "../models/user.model.js";
import { getToken } from "../utils/token.js";

// 🔥 Google Auth
export const googleAuth = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    let user = await UserModel.findOne({ email });

    if (!user) {
      user = await UserModel.create({ name, email });
    }

    const token = getToken(user._id.toString());

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,       // ⚠️ production (HTTPS)
      sameSite: "none",   // ⚠️ cross-origin
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.error("Google Auth Error:", error.message);

    return res.status(500).json({
      message: "Google signup Error",
    });
  }
};

// 🔥 Logout
export const logOutUser = async (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "Logout successfully",
    });

  } catch (error) {
    console.error("Logout Error:", error.message);

    return res.status(500).json({
      message: "Logout Error",
    });
  }
};