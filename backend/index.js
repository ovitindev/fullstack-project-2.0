// src/index.js
import express from "express";
import mongoose from "mongoose";
import routes from "./src/routes/index.js";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Conecte-se ao banco de dados
mongoose
  .connect("mongodb+srv://victorhugomarquezin:gMbRpG1I29Cf95ct@cluster0.00uc3lg.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("Banco de dados conectado");
    // Inicie o servidor após a conexão com o banco de dados
    app.listen(3000, () => {
      console.log("Servidor iniciado na porta 3000");
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });

// Configuração das rotas
app.use(routes);
