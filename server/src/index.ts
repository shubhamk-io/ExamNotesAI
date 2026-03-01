import "dotenv/config";

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

import connectDb from "./config/connectDB.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://googlauthexamnotes.firebaseapp.com"
  ],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser())

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send(`Server is running on port ${PORT}`);
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter)

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
});