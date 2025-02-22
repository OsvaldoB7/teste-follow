const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const CepAddress = require('./CepAddress');

const UserCepHistory = sequelize.define('UserCepHistory', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
}, {
  tableName: 'user_cep_histories',
  timestamps: true,
});


module.exports = UserCepHistory;