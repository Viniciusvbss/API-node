import bcrypt from 'bcrypt';
import Usuario from '../modals/UsuarioModal.js';

class UsuarioService {
  // Listar todos os usuários
  async listar() {
    return await Usuario.findAll();
  }

  // Buscar um usuário pelo ID
  async buscarPorId(id) {
    return await Usuario.findByPk(id);
  }

  // Criar novo usuário
  async criar({ nome, email, senha, tipo }) {
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

  // Atualizar usuário
  async atualizar(id, { nome, email, senha, tipo }) {
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
  }

  // Deletar usuário
  async deletar(id) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return null;

    await usuario.destroy();
    return true;
  }
}

export default new UsuarioService();
