import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1]; // pega só o token

  try {
    const decoded = jwt.verify(token, 'SUA_CHAVE_SECRETA');
    req.usuario = decoded; // dados do usuário no req
    next();
  } catch (error) {
    return res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
};

export default authMiddleware;
