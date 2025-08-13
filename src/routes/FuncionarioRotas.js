// routes/funcionariosRoutes.js
//import { Router } from 'express';
import express from 'express';
import {
  listarFuncionarios,
  buscarFuncionarioPorId,
  criarFuncionario,
  atualizarFuncionario,
  deletarFuncionario
} from '../Controllers/FuncionariosController.js';

const router = express.Router();

// Listar todos
router.get('/', listarFuncionarios);

// Buscar por ID
router.get('/:id', buscarFuncionarioPorId);

// Criar novo
router.post('/', criarFuncionario);

// Atualizar
router.put('/:id', atualizarFuncionario);

// Deletar
router.delete('/:id', deletarFuncionario);

export default router;