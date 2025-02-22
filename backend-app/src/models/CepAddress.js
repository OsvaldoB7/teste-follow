const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CepAddress = sequelize.define('CepAddress', {
  cep: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true, 
  },
  address: {
    type: DataTypes.JSON,
    allowNull: false,
  }
}, {
  tableName: 'cep_addresses',
  timestamps: true,
});

module.exports = CepAddress;