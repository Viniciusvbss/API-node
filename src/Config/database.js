import { Sequelize } from 'sequelize';

    const sequelize = new Sequelize('gerenciamento_funcionarios', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307
});

export default sequelize;
