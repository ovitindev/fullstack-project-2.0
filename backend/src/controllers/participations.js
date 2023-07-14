// src/controllers/participations.js
import Participation from "../models/Participation.js";

// Obtém todas as participations
export const getAllParticipations = async (req, res) => {
  try {
    const participations = await Participation.find();
    res.json(participations);
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter as participations", error: error.message });
  }
};

// Cria uma nova participation
export const createParticipation = async (req, res) => {
  const participation = req.body;
  try {
    const newParticipation = await Participation.create(participation);
    res.json(newParticipation);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar a participation", error: error.message });
  }
};

// Deleta uma participation por id
export const deleteParticipation = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedParticipation = await Participation.findByIdAndDelete(id);
    if (!deletedParticipation) {
      return res.status(404).json({ message: "Participation não encontrada" });
    }
    res.status(200).json({ message: "Participation excluída com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir a participation", error: error.message });
  }
};
