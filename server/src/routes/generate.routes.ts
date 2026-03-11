import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { generateNotes } from '../controllers/generate.Controller.js'

const notesRouter = express.Router()


notesRouter.post("/generate-notes", isAuth, generateNotes)

export default notesRouter
