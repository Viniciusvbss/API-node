import UsuarioService from '../service/UsuarioService.js';
import { getJsonToken } from '../utils/auth.js'


// Listar
export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await UsuarioService.listar();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar usuários', detalhes: error.message });
  }
};

// Buscar por ID
export const buscarUsuarioPorId = async (req, res) => {
  try {
    const usuario = await UsuarioService.buscarPorId(req.params.id);
    if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar usuário', detalhes: error.message });
  }
};

// Criar
export const criarUsuario = async (req, res) => {
  try {
    // ⚠️ Pega o tipo do usuário logado (req.user vem do middleware JWT)
    const jsonToken = await getJsonToken(req)
    const logadoTipo = jsonToken.tipo || null;
    // ou req.get("Authorization")
    console.log(jsonToken.tipo)


    const novoUsuario = await UsuarioService.criar(req.body, logadoTipo);
    res.status(201).json(novoUsuario);
  } catch (error) {
    // Se o erro for de permissão, devolve 403 (forbidden)
    if (error.message.includes('permissão')) {
      return res.status(403).json({ erro: error.message });
    }
    res.status(500).json({ erro: 'Erro ao criar usuário', detalhes: error.message });
  }
};


// Atualizar
export const atualizarUsuario = async (req, res) => {
  try {
    const usuarioAtualizado = await UsuarioService.atualizar(req.params.id, req.body);
    if (!usuarioAtualizado) return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.json(usuarioAtualizado);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar usuário', detalhes: error.message });
  }
};

// Deletar
export const deletarUsuario = async (req, res) => {
  try {
    const sucesso = await UsuarioService.deletar(req.params.id);
    if (!sucesso) return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.json({ mensagem: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar usuário', detalhes: error.message });
  }
};
