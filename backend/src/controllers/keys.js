// src/controllers/participations.js
import Key from "../models/Key.js";

// Obtém todas as participations
export async function getKey(req, res) {
  const keys = await Key.findOne();
  return keys.key;
}
