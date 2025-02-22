const axios = require('axios');
const { CepHistory } = require('../models'); 

const getCepInfo = async (req, res) => {
    try {
        let { cep } = req.params;
        cep = cep.trim();

        const cache = await CepHistory.findOne({ where: { cep } });
        if (cache) {
            return res.json(cache.address);
        }

        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (response.data.erro) {
            return res.status(404).json({ message: 'CEP não encontrado' });
        }

        await CepHistory.create({
            cep,
            address: response.data,
            userId: req.query.userId || null
        })


        return res.json(response.data);
    } catch (error) {
        console.error('Erro ao consultar o CEP:', error);
        return res.status(500).json({ message: 'Erro ao consultar o CEP' });
    }
};

const getHistory = async (req, res) => {
    try {
        const { userId } = req.params;
        const histories = await require('../models/CepHistory').findAll({ where: { userId } });
        return res.json(histories);
    } catch (error) {
        console.error('Erro ao consultar o histórico:', error);
        return res.status(500).json({ message: 'Erro ao consultar o histórico' });
    }
};

const deletCep = async (req, res) => {
    try {
        const { cep } = req.params;
        const requesterUserId = req.query.userId;
        const history = await CepHistory.findOne({ where: { cep } });
        if (!history) {
            return res.status(404).json({ message: 'Histórico não encontrado' });
        }
        if (String(history.userId) !== String(requesterUserId)) {
            return res.status(403).json({ message: 'Você não pode deletar este cep' });
        }

        await history.destroy();
        return res.json({ message: 'Histórico deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar o histórico:', error);
        return res.status(500).json({ message: 'Erro ao deletar o histórico' });
    }
}

const health = (res) => res.json({ status: 'OK' });

module.exports = { getCepInfo, getHistory, health, deletCep };