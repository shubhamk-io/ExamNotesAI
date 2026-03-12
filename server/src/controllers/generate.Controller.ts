import { Response } from "express";
import { AuthRequest } from "../middleware/isAuth.js";
import UserModel from "../models/user.model.js";
import { buildPrompt } from "../utils/promptBuilder.js";
import { generateGeminiResponse } from "../services/gemini.services.js";
import Notes from "../models/notes.model.js";

export const generateNotes = async (req: AuthRequest, res: Response) => {
    try {

        const {
            topic,
            classLevel,
            examType,
            revisionMode = false,
            includeDiagram = false,
            includeCharts = false
        } = req.body;

        if (!topic) {
            return res.status(400).json({ message: "Topic is required" });
        }

        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.credits < 10) {
            user.isCreditAvailable = false
            await user.save()
            return res.status(403).json({ error: "Insufficient Credits" });
        }

        

        const prompt = buildPrompt({
            topic,
            classLevel,
            examType,
            revisionMode,
            includeDiagram,
            includeCharts
        })

        const aiResponse = await generateGeminiResponse(prompt)

        const notes = await Notes.create({
            user: user._id,
            topic,
            classLevel,
            examType,
            revisionMode,
            includeDiagram,
            includeCharts,
            content: aiResponse
        })

        user.credits -= 10
        if (user.credits <= 10) user.isCreditAvailable = false;

        if (!Array.isArray(user.notes)) {
            user.notes = []
        }

        user.notes.push(notes._id)

        await user.save()

        res.status(200).json({
            data: aiResponse,
            notesId: notes._id,
            creditsLeft: user.credits
        })




    } catch (error:any) {
        console.error(error);
        res.status(500).json({
            error: "AI Generation Failed",
            message: error.message
        });
    }
};