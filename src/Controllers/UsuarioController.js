import bcrypt from 'bcrypt';
import Usuario from '../modal/UsuarioModal.js';

// Listar todos os usuários
export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar usuários', detalhes: error.message });
  }
};

// Buscar um usuário pelo ID
export const buscarUsuarioPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar usuário', detalhes: error.message });
  }
};

// Criar um novo usuário com senha criptografada
export const criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, tipo } = req.body;

    if (!nome || !email || !senha || !tipo) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }

    // Opcional: Verifica se o tipo é válido, conforme ENUM no modelo
    const tiposValidos = ['admin', 'gerente', 'rh'];
    if (!tiposValidos.includes(tipo)) {
      return res.status(400).json({ erro: 'Tipo inválido.' });
    }

    // Checa se email já existe para evitar duplicidade
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ erro: 'Email já cadastrado.' });
    }

    const senha_hash = await bcrypt.hash(senha, 10);

    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha_hash,
      tipo,
      criado_em: new Date(),
      atualizado_em: new Date()
    });

    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ erro: 'Erro ao criar usuário', detalhes: error.message });
  }
};


// Atualizar um usuário pelo ID com hash de senha se enviada
export const atualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha, tipo } = req.body;
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    usuario.nome = nome || usuario.nome;
    usuario.email = email || usuario.email;
    if (senha) {
      const saltRounds = 10;
      usuario.senha_hash = await bcrypt.hash(senha, saltRounds);
    }
    usuario.tipo = tipo || usuario.tipo;
    usuario.atualizado_em = new Date();

    await usuario.save();

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar usuário', detalhes: error.message });
  }
};

// Deletar um usuário pelo ID
export const deletarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    await usuario.destroy();
    res.json({ mensagem: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar usuário', detalhes: error.message });
  }
};
