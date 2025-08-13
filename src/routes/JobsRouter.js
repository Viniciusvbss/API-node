import express from 'express';
import {
  listarJobs,
  buscarJobPorId,
  criarJob,
  atualizarJob,
  deletarJob
} from '../Controllers/JobsController.js';

const router = express.Router();

router.get('/', listarJobs);           // GET /api/jobs
router.get('/:id', buscarJobPorId);    // GET /api/jobs/:id
router.post('/', criarJob);            // POST /api/jobs
router.put('/:id', atualizarJob);      // PUT /api/jobs/:id
router.delete('/:id', deletarJob);     // DELETE /api/jobs/:id

export default router;
