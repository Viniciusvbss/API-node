import { DataTypes } from 'sequelize';
import sequelize from '../Config/database.js';

const Jobs = sequelize.define('Jobs', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  salario: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  criado_em: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'jobs',
  timestamps: false
});

export default Jobs;
