import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ message: "Token not found" });
        }

        const verifyToken = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if (!verifyToken.userId) {
            return res.status(401).json({ message: "Invalid token" });
        }

        // 👇 custom field add kar rahe ho request me
        req.userId = verifyToken.userId;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

export default isAuth;