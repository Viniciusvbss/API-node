import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1]; // formato: Bearer <token>

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Aqui decodifica o token e salva no request
    // Ex: { id: 1, tipo: 'admin' }
    req.user = decoded;  

    next();
  } catch (error) {
    return res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
};

export default authMiddleware;
