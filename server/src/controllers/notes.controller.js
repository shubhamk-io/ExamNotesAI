import Notes from "../models/notes.model.js";

// 🔥 Get all notes
export const getMyNotes = async (req, res) => {
  try {
    console.log("USER ID:", req.userId);

    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const notes = await Notes.find({ user: req.userId })
      .select(
        "topic classLevel examType revisionMode includeDiagram includeCharts createdAt"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      notes: notes || [],
    });
  } catch (error) {
    console.error("Get Notes Error:", error.message);
    return res.status(500).json({
      message: "Error fetching notes",
    });
  }
};

// 🔥 Get single note
export const getSingleNotes = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    const notes = await Notes.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!notes) {
      return res.status(404).json({
        error: "Notes not found",
      });
    }

    return res.json({
      content: notes.content,
      topic: notes.topic,
      createdAt: notes.createdAt,
    });
  } catch (error) {
    console.error("Single Note Error:", error.message);
    return res.status(500).json({
      message: "Error fetching note",
    });
  }
};