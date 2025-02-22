const express = require('express');
const { getCepInfo, getHistory, health, deletCep } = require('../controllers/cepController');
const authRoutes = require('./authRoutes');

const router = express.Router();

router.get('/health', health);
router.get('/cep/:cep', getCepInfo);
router.get('/history/:userId', getHistory);
router.delete('/delete/:cep', deletCep);

router.use('/', authRoutes)

module.exports = router;