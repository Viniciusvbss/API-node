import dotenv from 'dotenv';
dotenv.config();


import express from 'express'
import sequelize from './src/Config/database.js'
import usuarioRoutes from './src/routes/UsuarioRotas.js'
import funcionarioRoutes from './src/routes/FuncionarioRotas.js'
import jobsRoutes from './src/routes/JobsRouter.js'
const app = express()

app.use(express.json()); // para receber JSON no body
app.use('/api/usuarios', usuarioRoutes); // prefixo da rota
app.use('/api/funcionarios', funcionarioRoutes); // prefixo da rota
app.use('/api/jobs', jobsRoutes); // prefixo da rota

// Testar conexão com banco antes de iniciar o servidor
async function startServer() {
    try {
      await sequelize.authenticate();
      console.log('Conectado ao MySQL');
      app.listen(3000, () => {
        console.log('Servidor rodando em http://localhost:3000');
      });
    } catch (err) {
      console.error('Erro ao conectar no banco:', err);
    }
  }
  
  startServer();