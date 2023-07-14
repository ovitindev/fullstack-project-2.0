// src/routes/participations.js
import express from "express";
import { getAllParticipations, createParticipation, deleteParticipation } from "../controllers/participations.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rotas relacionadas às participations
router.get("/", authenticateToken, getAllParticipations);
router.post("/", authenticateToken, createParticipation);
router.delete("/:id", authenticateToken, deleteParticipation);

export default router;
