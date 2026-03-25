import "dotenv/config";

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

import connectDb from "./config/connectDB.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import notesRouter from "./routes/generate.routes.js";
import pdfRouter from "./routes/pdf.route.js";
import creditRouter from "./routes/credits.route.js";
import { stripeWebHook } from "./controllers/credits.controller.js";

const app = express();

app.post(
  "/api/credits/webhook",
  express.raw({type:"application/json"}),
  stripeWebHook
);

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
app.use("/api/notes",notesRouter)
app.use("/api/pdf",pdfRouter)
app.use("/api/credit",creditRouter)

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
});