import { Request, Response } from "express";
import Notes from "../models/notes.model.js";
import { note } from "pdfkit";


export interface AuthRequest extends Request {
    userId?: string;
}

export const getMyNotes = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated",
            });
        }

        const notes = await Notes.find({ user: req.userId })
            .select("topic classLevel examType revisionMode includeDiagram includeChart")
            .sort({ createdAt: -1 });

        if (!notes) {
            return res.status(404).json({
                error: "Notes not found"
            })
        }
        return res.status(200).json(notes)

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: ` Error in notes controller ${error}` })
        }
    }
}



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