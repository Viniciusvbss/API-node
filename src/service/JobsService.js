import Jobs from '../models/JobsModel.js';

// Listar todos os jobs
const listar = async () => {
  return await Jobs.findAll();
};

// Buscar job por ID
const buscarPorId = async (id) => {
  return await Jobs.findByPk(id);
};

// Criar job
const criar = async ({ titulo, descricao, salario }) => {
  return await Jobs.create({
    titulo,
    descricao,
    salario,
    criado_em: new Date()
  });
};

// Atualizar job
const atualizar = async (id, { titulo, descricao, salario }) => {
  const job = await Jobs.findByPk(id);
  if (!job) return null;

  job.titulo = titulo || job.titulo;
  job.descricao = descricao || job.descricao;
  job.salario = salario || job.salario;

  await job.save();
  return job;
};

// Deletar job
const deletar = async (id) => {
  const job = await Jobs.findByPk(id);
  if (!job) return null;

  await job.destroy();
  return true;
};

export default {
  listar,
  buscarPorId,
  criar,
  atualizar,
  deletar
};
