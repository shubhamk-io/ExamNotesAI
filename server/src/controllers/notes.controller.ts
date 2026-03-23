import { Request, Response } from "express";
import Notes from "../models/notes.model.js";
import { AuthRequest } from "../middleware/isAuth.js";





export const getMyNotes = async (req: AuthRequest, res: Response) => {
  try {
    console.log("USER ID:", req.userId); // 🔥 debug

    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const notes = await Notes.find({ user: req.userId })
      .select("topic classLevel examType revisionMode includeDiagram includeChart createdAt")
      .sort({ createdAt: -1 });

    // ✅ IMPORTANT: never send 404 for empty array
    return res.status(200).json({
      success: true,
      notes: notes || [],
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error fetching notes",
    });
  }
};



export const getSingleNotes = async (req: AuthRequest, res: Response) => {
    try {
        const notes = await Notes.findOne({
            _id: req.params.id,
            user: req.userId
        })
        if (!notes) {
            return res.status(404).json({
                error: "Notes not found"
            })
        }

        return res.json({
            content: notes.content,
            topic:notes.topic,
            createdAt:notes.createdAt
        })

    } catch (error) {

    }
}