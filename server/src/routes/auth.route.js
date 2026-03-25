import express from "express"
import { googleAuth, logOutUser } from "../controllers/auth.controller.js"


const authRouter = express.Router()

authRouter.post("/google", googleAuth)
authRouter.get("/logout", logOutUser)

export default authRouter