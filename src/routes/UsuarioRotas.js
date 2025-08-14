import express from 'express';
import {
  listarUsuarios,
  buscarUsuarioPorId,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario
} from '../Controllers/UsuarioController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { login } from '../Controllers/AuthController.js';


const router = express.Router();

router.post('/login', login); // rota pública
router.get('/', authMiddleware, listarUsuarios);       // GET /api/usuarios
router.get('/:id', authMiddleware, buscarUsuarioPorId); // GET /api/usuarios/:id
router.post('/', criarUsuario);        // POST /api/usuarios
router.put('/:id', authMiddleware, atualizarUsuario);   // PUT /api/usuarios/:id
router.delete('/:id', authMiddleware, deletarUsuario);  // DELETE /api/usuarios/:id


export default router;
