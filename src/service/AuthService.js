import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Usuario from '../models/UsuarioModel.js';

// Função para fazer Login
export const Login = async (email, senha) => {
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) {
    throw new Error('Usuário não encontrado');
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
  if (!senhaValida) {
    throw new Error('Senha incorreta'); // lança erro, não usa res
  }

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email, tipo: usuario.tipo },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || '1h' }
  );

  // Função interna para verificar token
  const verificarToken = (token) => {
    try {
      const tokenLimpo = token?.replace('Bearer ', '') || token;
      return jwt.verify(tokenLimpo, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Token inválido ou expirado');
    }
  };

  return { token, usuario, verificarToken };
};
