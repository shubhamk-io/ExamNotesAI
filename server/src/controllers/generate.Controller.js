import UserModel from "../models/user.model.js";
import { buildPrompt } from "../utils/promptBuilder.js";
import { generateGeminiResponse } from "../services/gemini.services.js";
import Notes from "../models/notes.model.js";

export const generateNotes = async (req, res) => {
  try {
    const {
      topic,
      classLevel,
      examType,
      revisionMode = false,
      includeDiagram = false,
      includeCharts = false,
    } = req.body;

    if (!topic) {
      return res.status(400).json({ message: "Topic is required" });
    }

    if (!req.userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔥 Credit check
    if (user.credits < 10) {
      user.isCreditAvailable = false;
      await user.save();

      return res.status(403).json({
        error: "Insufficient Credits",
      });
    }

    // 🔥 Build prompt
    const prompt = buildPrompt({
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeCharts,
    });

    // 🔥 AI call
    const aiResponse = await generateGeminiResponse(prompt);

    // 🔥 Save notes
    const notes = await Notes.create({
      user: user._id,
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeCharts,
      content: aiResponse,
    });

    // 🔥 Update credits
    user.credits -= 10;

    if (user.credits <= 10) {
      user.isCreditAvailable = false;
    }

    // 🔥 Ensure notes array exists
    if (!Array.isArray(user.notes)) {
      user.notes = [];
    }

    user.notes.push(notes._id);

    await user.save();

    return res.status(200).json({
      success: true,
      data: aiResponse,
      notesId: notes._id,
      creditsLeft: user.credits,
    });

  } catch (error) {
    console.error("Generate Notes Error:", error.message);

    return res.status(500).json({
      error: "AI Generation Failed",
      message: error.message,
    });
  }
};