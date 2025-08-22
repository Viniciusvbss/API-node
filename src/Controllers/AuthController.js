import { Login } from '../service/AuthService.js';

export const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const resultado = await Login(email, senha);
    res.json({ mensagem: 'Login realizado com sucesso', token: resultado.token })
  } catch (error) {
    res.status(500).json({ erro: 'Erro no login', detalhes: error.message });
  }
};
