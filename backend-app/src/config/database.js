const { Sequelize } = require('sequelize');
const dbConfig = require('./dbConfig');

const sequelize = new Sequelize(
    dbConfig.POSTGRES_DB,
    dbConfig.POSTGRES_USER,
    dbConfig.POSTGRES_PASSWORD,
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('conexão estável com o banco de dados!');
    })
    .catch((error) => {
        console.error('erro ao tentar conectar com o banco de dados', error);
    });

module.exports = sequelize;