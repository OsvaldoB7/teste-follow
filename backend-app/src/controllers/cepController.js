const axios = require('axios');
const  CepAddress  = require('../models/CepAddress'); 
const UserCepHistory = require('../models/UserCepHistory');
const { User } = require('../models');

const getCepInfo = async (req, res) => {
    try {
        let { cep } = req.params;
        cep = cep.trim();
        const { userId } = req.query;

        let cepRecord = await CepAddress.findByPk(cep);
        if (!cepRecord) {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            if (response.data.erro) {
                return res.status(404).json({ message: 'CEP não encontrado' });
            }
            cepRecord = await CepAddress.create({
                cep,
                address: response.data
            });
        }
        
        let ValidateDuplication = null;
        if (userId) {
            const ValidateDuplication = await UserCepHistory.findOne({ where: { userId, cep } });
        } if (!ValidateDuplication) {
            await UserCepHistory.create({ userId, cep });
        }
        return res.json(cepRecord.address);
    } catch (error) {
        console.error('Erro ao consultar o CEP:', error);
        return res.status(500).json({ message: 'Erro ao consultar o CEP' });
    }
};

const getHistory = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByPk(userId,{
            include: [{
                model: CepAddress,
                as: 'cepAddresses',
                attributes: ['cep'],
                through: {
                    attributes: ['createdAt'],
                }
            }],
        });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        return res.json(user.cepAddresses);
    } catch (error) {
        console.error('Erro ao consultar o histórico:', error);
        return res.status(500).json({ message: 'Erro ao consultar o histórico' });
    }
};

const deletCep = async (req, res) => {
    try {
        const { cep } = req.params;
        const requesterUserId = req.query.userId;

        const deleteCount = await UserCepHistory.destroy({
            where: { userId: requesterUserId, cep },
        });
        if (deleteCount === 0) {
            return res.status(404).json({ message: 'CEP não encontrado no histórico' });
        }
        return res.json({ message: 'CEP deletado com sucesso' });


    } catch (error) {
        console.error('Erro ao deletar o histórico:', error);
        return res.status(500).json({ message: 'Erro ao deletar o histórico' });
    }
}

const health = (req, res) => res.json({ status: 'OK' });

module.exports = { getCepInfo, getHistory, health, deletCep };