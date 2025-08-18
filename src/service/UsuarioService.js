import bcrypt from 'bcrypt';
import Usuario from '../models/UsuarioModel.js';

// Listar todos os usuários
const listar = async () => {
  return await Usuario.findAll();
};

// Buscar um usuário pelo ID
const buscarPorId = async (id) => {
  return await Usuario.findByPk(id);
};

// Criar novo usuário com regra de hierarquia
const criar = async ({ nome, email, senha, tipo }, logadoTipo = null) => {
  const totalUsuarios = await Usuario.count();

  // Se for o primeiro usuário, permite criar qualquer tipo
  if (totalUsuarios === 0) {
    const senha_hash = await bcrypt.hash(senha, 10);
    return await Usuario.create({
      nome,
      email,
      senha_hash,
      tipo,
      criado_em: new Date(),
      atualizado_em: new Date()
    });
  }

  // Definição de permissões
  const permissoes = {
    admin: ['admin', 'gerente', 'rh'],
    gerente: ['gerente', 'rh','admin'],
    rh: ['rh']
  };

  // Verifica se o logado tem permissão para criar o novo tipo
  if (!permissoes[logadoTipo]?.includes(tipo)) {
    throw new Error('Você não tem permissão para criar este tipo de usuário');
  }

  // Criação do usuário
  const senha_hash = await bcrypt.hash(senha, 10);
  return await Usuario.create({
    nome,
    email,
    senha_hash,
    tipo,
    criado_em: new Date(),
    atualizado_em: new Date()
  });
};

// Atualizar usuário
const atualizar = async (id, { nome, email, senha, tipo }) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) return null;

  usuario.nome = nome || usuario.nome;
  usuario.email = email || usuario.email;
  if (senha) {
    usuario.senha_hash = await bcrypt.hash(senha, 10);
  }
  usuario.tipo = tipo || usuario.tipo;
  usuario.atualizado_em = new Date();

  await usuario.save();
  return usuario;
};

// Deletar usuário
const deletar = async (id) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) return null;

  await usuario.destroy();
  return true;
};

export default {
  listar,
  buscarPorId,
  criar,
  atualizar,
  deletar
};
