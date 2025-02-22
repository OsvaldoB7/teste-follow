const User = require('./User');
const UserCepHistory = require('./UserCepHistory');
const CepAddress = require('./CepAddress');

User.belongsToMany(CepAddress, {
    through: UserCepHistory,
    foreignKey: 'userId',
    as: 'cepAddresses'
  });
  
  CepAddress.belongsToMany(User, {
    through: UserCepHistory,
    foreignKey: 'cep',
    as: 'users'
  });

module.exports = { User, UserCepHistory, CepAddress };