import 'dotenv/config';
import express from 'express';
import routes from '../routes/index.js';

const app = express();
app.use(express.json()); // Habilita receber JSON no corpo das requisições
app.use('/', routes);    // Usa as rotas definidas no index.js

export default app; // Exporta variavel app 