import express from 'express';
const router = express.Router();

// Rota de teste
router.get('/', (req, res) => {
  res.json({ message: 'API funcionando!' });
});

// Rota de health check
router.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

export default router; 