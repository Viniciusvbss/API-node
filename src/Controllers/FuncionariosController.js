import Funcionarios from '../modals/FuncionariosModal.js';

// Listar todos os funcionários
export const listarFuncionarios = async (req, res) => {
  try {
    const funcionarios = await Funcionarios.findAll();
    res.json(funcionarios);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar funcionários', detalhes: error.message });
  }
};

// Buscar um funcionário pelo ID
export const buscarFuncionarioPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const funcionario = await Funcionarios.findByPk(id);
    if (!funcionario) {
      return res.status(404).json({ erro: 'Funcionário não encontrado' });
    }
    res.json(funcionario);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar funcionário', detalhes: error.message });
  }
};

// Criar um novo funcionário
export const criarFuncionario = async (req, res) => {
  const {
    nome,
    email,
    telefone,
    endereco,
    data_nascimento,
    data_admissao,
    status,
    job_id
  } = req.body;

  try {
    const novoFuncionario = await Funcionarios.create({
      nome,
      email,
      telefone,
      endereco,
      data_nascimento,
      data_admissao,
      status,
      job_id,
      criado_em: new Date()
    });

    res.status(201).json(novoFuncionario);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar funcionário', detalhes: error.message });
  }
};

// Atualizar um funcionário pelo ID
export const atualizarFuncionario = async (req, res) => {
  const { id } = req.params;
  const {
    nome,
    email,
    telefone,
    endereco,
    data_nascimento,
    data_admissao,
    status,
    job_id
  } = req.body;

  try {
    const funcionario = await Funcionarios.findByPk(id);
    if (!funcionario) {
      return res.status(404).json({ erro: 'Funcionário não encontrado' });
    }

    funcionario.nome = nome || funcionario.nome;
    funcionario.email = email || funcionario.email;
    funcionario.telefone = telefone || funcionario.telefone;
    funcionario.endereco = endereco || funcionario.endereco;
    funcionario.data_nascimento = data_nascimento || funcionario.data_nascimento;
    funcionario.data_admissao = data_admissao || funcionario.data_admissao;
    funcionario.status = status || funcionario.status;
    funcionario.job_id = job_id || funcionario.job_id;
    funcionario.criado_em = funcionario.criado_em; // não atualiza esse campo

    await funcionario.save();

    res.json(funcionario);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar funcionário', detalhes: error.message });
  }
};

// Deletar um funcionário pelo ID
export const deletarFuncionario = async (req, res) => {
  const { id } = req.params;
  try {
    const funcionario = await Funcionarios.findByPk(id);
    if (!funcionario) {
      return res.status(404).json({ erro: 'Funcionário não encontrado' });
    }

    await funcionario.destroy();
    res.json({ mensagem: 'Funcionário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar funcionário', detalhes: error.message });
  }
};
