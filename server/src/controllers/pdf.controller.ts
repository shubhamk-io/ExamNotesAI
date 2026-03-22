import { Request, Response } from "express";
import PDFDocument from "pdfkit";

export const pdfDownload = (req: Request, res: Response) => {
    try {
        const { result } = req.body;

        if (!result) {
            return res.status(400).json({ error: "No content provided" });
        }

        const doc = new PDFDocument({ margin: 50 });

        // Headers
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=ExamNotesAI.pdf");

        doc.pipe(res);

        // Title (Top Center)
        doc
            .fontSize(22)
            .fillColor("#4F46E5")
            .text("ExamNotes AI", 50, 50, { align: "center" });

        doc.moveDown(2);
        doc.fillColor("black");

        // Important
        doc.fontSize(14).text(`Important: ${result.importance}`);
        doc.moveDown();

        // Sub Topics
        doc.fontSize(16).text("Sub Topics");
        doc.moveDown(0.5);

        Object.entries(result.subTopics).forEach(([star, topics]: any) => {
            doc.moveDown(0.5);
            doc.fontSize(13).text(`${star} Topics:`);

            topics.forEach((t: string) => {
                doc.fontSize(12).text(`• ${t}`);
            });
        });

        doc.moveDown();

        // 🔥 Notes (STRONG CLEAN FIX)
        doc.fontSize(16).text("Notes");
        doc.moveDown(0.5);

        let rawNotes = result.notes || "";

        // decode if encoded (like %20)
        try {
            rawNotes = decodeURIComponent(rawNotes);
        } catch (e) {
            // ignore if not encoded
        }

        const cleanNotes = rawNotes
            .replace(/[%#*/\\]/g, "")     // remove %, #, *, /, \
            .replace(/\/\/+/g, "")       // remove //
            .replace(/\r/g, "")          // remove carriage return
            .split("\n")
            .map((line: string) => line.trim())
            .filter((line: string) => line.length > 0);

        cleanNotes.forEach((line: string) => {
            doc.fontSize(12).text(`● ${line}`);
        });

        doc.moveDown();

        // Revision Points
        doc.fontSize(16).text("Revision Points");
        doc.moveDown(0.5);

        result.revisionPoints.forEach((p: string) => {
            doc.fontSize(12).text(`● ${p}`);
        });

        doc.moveDown();

        // Questions
        doc.fontSize(16).text("Important Questions");
        doc.moveDown(0.5);

        doc.fontSize(13).text("Short Question:");
        result.questions.short.forEach((q: string) => {
            doc.fontSize(12).text(`● ${q}`);
        });

        doc.moveDown(0.5);

        doc.fontSize(13).text("Long Questions:");
        result.questions.long.forEach((q: string) => {
            doc.fontSize(12).text(`● ${q}`);
        });

        doc.moveDown(0.5);

        doc.fontSize(13).text("Diagram Questions:");
        doc.fontSize(12).text(result.questions.diagram);

        // End document
        doc.end();

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};