import UserModel from "../models/user.model.js";
import { getToken } from "../utils/token.js";

// Cookie options ek jagah define karo — reuse karo
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

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

    // ✅ Cookie set
    res.cookie("token", token, COOKIE_OPTIONS);

    return res.status(200).json({
      success: true,
      token,        // ✅ Frontend ko bhi token do
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Google Auth Error:", error.message);
    return res.status(500).json({ message: "Google signup Error" });
  }
};

// 🔥 Logout
export const logOutUser = async (req, res) => {
  try {
    // ✅ Same options se clear karo — warna browser ignore karta hai
    res.clearCookie("token", COOKIE_OPTIONS);

    return res.status(200).json({
      success: true,
      message: "Logout successfully",
    });

  } catch (error) {
    console.error("Logout Error:", error.message);
    return res.status(500).json({ message: "Logout Error" });
  }
};