const express = require('express');
const { getCepInfo, getHistory, health } = require('../controllers/cepController');

const router = express.Router();

// Endpoint para verificar a saúde da API
router.get('/health', health);

// Endpoint para consultar informações de um CEP
router.get('/cep/:cep', getCepInfo);

// Endpoint para consultar o histórico de CEPs para um usuário
router.get('/history/:userId', getHistory);

module.exports = router;