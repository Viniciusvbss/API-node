import JobsService from '../service/JobsService.js';

// Listar todos os jobs
export const listarJobs = async (req, res) => {
  try {
    const jobs = await JobsService.listar();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar jobs', detalhes: error.message });
  }
};

// Buscar job por ID
export const buscarJobPorId = async (req, res) => {
  try {
    const job = await JobsService.buscarPorId(req.params.id);
    if (!job) {
      return res.status(404).json({ erro: 'Job não encontrado' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar job', detalhes: error.message });
  }
};

// Criar job
export const criarJob = async (req, res) => {
  try {
    const novoJob = await JobsService.criar(req.body);
    res.status(201).json(novoJob);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar job', detalhes: error.message });
  }
};

// Atualizar job
export const atualizarJob = async (req, res) => {
  try {
    const jobAtualizado = await JobsService.atualizar(req.params.id, req.body);
    if (!jobAtualizado) {
      return res.status(404).json({ erro: 'Job não encontrado' });
    }
    res.json(jobAtualizado);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar job', detalhes: error.message });
  }
};

// Deletar job
export const deletarJob = async (req, res) => {
  try {
    const deletado = await JobsService.deletar(req.params.id);
    if (!deletado) {
      return res.status(404).json({ erro: 'Job não encontrado' });
    }
    res.json({ mensagem: 'Job deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar job', detalhes: error.message });
  }
};
