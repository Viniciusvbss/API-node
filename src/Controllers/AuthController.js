import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Usuario from '../models/UsuarioModel.js';

export const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
    if (!senhaValida) {
      return res.status(401).json({ erro: 'Senha incorreta' });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email }, // payload
      process.env.JWT_SECRET,                   // chave do .env
      { expiresIn: process.env.JWT_EXPIRES || '1h' } // usa expiração do .env ou 1h por padrão
    );

    res.json({ mensagem: 'Login realizado com sucesso', token });
  } catch (error) {
    res.status(500).json({ erro: 'Erro no login', detalhes: error.message });
  }
};
