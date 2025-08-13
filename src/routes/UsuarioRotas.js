import express from 'express';
import {
  listarUsuarios,
  buscarUsuarioPorId,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario
} from '../controllers/UsuarioController.js';

const router = express.Router();

router.get('/', listarUsuarios);       // GET /api/usuarios
router.get('/:id', buscarUsuarioPorId); // GET /api/usuarios/:id
router.post('/', criarUsuario);        // POST /api/usuarios
router.put('/:id', atualizarUsuario);   // PUT /api/usuarios/:id
router.delete('/:id', deletarUsuario);  // DELETE /api/usuarios/:id


export default router;
