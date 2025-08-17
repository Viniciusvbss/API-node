import FuncionariosService from '../service/FuncionariosService.js';

// Listar todos os funcionários
export const listarFuncionarios = async (req, res) => {
  try {
    const funcionarios = await FuncionariosService.listar();
    res.json(funcionarios);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar funcionários', detalhes: error.message });
  }
};

// Buscar funcionário por ID
export const buscarFuncionarioPorId = async (req, res) => {
  try {
    const funcionario = await FuncionariosService.buscarPorId(req.params.id);
    if (!funcionario) {
      return res.status(404).json({ erro: 'Funcionário não encontrado' });
    }
    res.json(funcionario);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar funcionário', detalhes: error.message });
  }
};

// Criar funcionário
export const criarFuncionario = async (req, res) => {
  try {
    const novoFuncionario = await FuncionariosService.criar(req.body);
    res.status(201).json(novoFuncionario);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar funcionário', detalhes: error.message });
  }
};

// Atualizar funcionário
export const atualizarFuncionario = async (req, res) => {
  try {
    const funcionarioAtualizado = await FuncionariosService.atualizar(req.params.id, req.body);
    if (!funcionarioAtualizado) {
      return res.status(404).json({ erro: 'Funcionário não encontrado' });
    }
    res.json(funcionarioAtualizado);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar funcionário', detalhes: error.message });
  }
};

// Deletar funcionário
export const deletarFuncionario = async (req, res) => {
  try {
    const deletado = await FuncionariosService.deletar(req.params.id);
    if (!deletado) {
      return res.status(404).json({ erro: 'Funcionário não encontrado' });
    }
    res.json({ mensagem: 'Funcionário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar funcionário', detalhes: error.message });
  }
};
