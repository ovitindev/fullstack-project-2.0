import express from 'express';
import { generateToken } from '../controllers/auth.js';
import participationsRouter from './participations.js';
import cors from 'cors';

const app = express(); // Criar uma instância do aplicativo Express

// Configurar o CORS permitindo todas as origens
app.use(cors());

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const tokenToCompare = req.header("Authorization"); // Obtém o token do cabeçalho "Authorization" 
    const token = await generateToken(tokenToCompare); // Passa o token para a função generateToken
    res.json({ token });
  } catch (error) {
    console.error('Erro ao gerar o token:', error);
    res.status(500).json({ error: 'Erro ao gerar o token' });
  }
});

// Rotas relacionadas às participations
router.use("/participations", participationsRouter);

export default router;
