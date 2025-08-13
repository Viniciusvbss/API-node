import Jobs from '../modal/JobsModal.js';

// Listar todos os jobs
export const listarJobs = async (req, res) => {
  try {
    const jobs = await Jobs.findAll();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar jobs', detalhes: error.message });
  }
};

// Buscar um job pelo ID
export const buscarJobPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Jobs.findByPk(id);
    if (!job) {
      return res.status(404).json({ erro: 'Job não encontrado' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar job', detalhes: error.message });
  }
};

// Criar um novo job
export const criarJob = async (req, res) => {
  const { titulo, descricao, salario } = req.body;

  try {
    const novoJob = await Jobs.create({
      titulo,
      descricao,
      salario,
      criado_em: new Date()
    });

    res.status(201).json(novoJob);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar job', detalhes: error.message });
  }
};

// Atualizar um job pelo ID
export const atualizarJob = async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, salario } = req.body;

  try {
    const job = await Jobs.findByPk(id);
    if (!job) {
      return res.status(404).json({ erro: 'Job não encontrado' });
    }

    job.titulo = titulo || job.titulo;
    job.descricao = descricao || job.descricao;
    job.salario = salario || job.salario;
    job.criado_em = job.criado_em; // mantém data original

    await job.save();

    res.json(job);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar job', detalhes: error.message });
  }
};

// Deletar um job pelo ID
export const deletarJob = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Jobs.findByPk(id);
    if (!job) {
      return res.status(404).json({ erro: 'Job não encontrado' });
    }

    await job.destroy();
    res.json({ mensagem: 'Job deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar job', detalhes: error.message });
  }
};
