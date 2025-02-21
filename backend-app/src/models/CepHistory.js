const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const CepHistory = sequelize.define('CepHistory', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    cep: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.JSON,
        allowNull: false,
    },
}, {
    tableName: 'cep_histories',
    timestamps: true,
});

User.hasMany(CepHistory, { foreignKey: 'userId', as: 'cepHistories' });
CepHistory.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = CepHistory;