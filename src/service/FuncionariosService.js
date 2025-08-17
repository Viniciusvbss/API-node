import Funcionarios from '../models/FuncionariosModel.js';

// Listar todos os funcionários
const listar = async () => {
  return await Funcionarios.findAll();
};

// Buscar funcionário por ID
const buscarPorId = async (id) => {
  return await Funcionarios.findByPk(id);
};

// Criar funcionário
const criar = async ({ nome, email, telefone, endereco, data_nascimento, data_admissao, status, job_id }) => {
  return await Funcionarios.create({
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
};

// Atualizar funcionário
const atualizar = async (id, { nome, email, telefone, endereco, data_nascimento, data_admissao, status, job_id }) => {
  const funcionario = await Funcionarios.findByPk(id);
  if (!funcionario) return null;

  funcionario.nome = nome || funcionario.nome;
  funcionario.email = email || funcionario.email;
  funcionario.telefone = telefone || funcionario.telefone;
  funcionario.endereco = endereco || funcionario.endereco;
  funcionario.data_nascimento = data_nascimento || funcionario.data_nascimento;
  funcionario.data_admissao = data_admissao || funcionario.data_admissao;
  funcionario.status = status || funcionario.status;
  funcionario.job_id = job_id || funcionario.job_id;

  await funcionario.save();
  return funcionario;
};

// Deletar funcionário
const deletar = async (id) => {
  const funcionario = await Funcionarios.findByPk(id);
  if (!funcionario) return null;

  await funcionario.destroy();
  return true;
};

export default {
  listar,
  buscarPorId,
  criar,
  atualizar,
  deletar
};
