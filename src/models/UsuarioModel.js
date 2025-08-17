import { DataTypes } from 'sequelize';
import sequelize from '../Config/database.js';

const Usuario = sequelize.define('Usuario', {
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
  senha_hash: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM('admin', 'gerente', 'rh'), // ajuste os valores conforme seu banco
    allowNull: false
  },
  criado_em: {
    type: DataTypes.DATE,
    allowNull: false
  },
  atualizado_em: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'usuarios',
  timestamps: false // porque você já tem 'criado_em' e 'atualizado_em'
});

export default Usuario;
