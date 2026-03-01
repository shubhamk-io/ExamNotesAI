import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

interface MyJwtPayload {
    userId: string
}

 export interface AuthRequest extends Request {
    userId?: string
}

const isAuth = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { token } = req.cookies

        if (!token) {
            return res.status(401).json({ message: "Token not found" })
        }

        const verifyToken = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as MyJwtPayload

        if (!verifyToken.userId) {
            return res.status(401).json({ message: "Invalid token" })
        }

        req.userId = verifyToken.userId

        next()
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" })
    }
}

export default isAuth