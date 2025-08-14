import { DataTypes } from 'sequelize';
import sequelize from '../Config/database.js';

const Funcionarios = sequelize.define('Funcionarios', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  telefone: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  endereco: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  data_nascimento: {
    type: DataTypes.DATE,
    allowNull: false
  },
  data_admissao: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('ativo', 'inativo'), // ajuste os valores conforme os que estão definidos no banco
    allowNull: false
  },
  job_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  criado_em: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'funcionarios',
  timestamps: false
});

export default Funcionarios;
