const express = require('express');
const { getCepInfo, getHistory, health, deletCep } = require('../controllers/cepController');
const authRoutes = require('./authRoutes');

const router = express.Router();


/**
 * @swagger
 * /health:
 *   get:
 *     summary: Verifica se o serviço está ativo
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/health', health);

/**
 * @swagger
 * /cep/{cep}:
 *   get:
 *     summary: Retorna as informações de um CEP
 *     parameters:
 *       - in: path
 *         name: cep
 *         schema:
 *           type: string
 *         required: true
 *         description: CEP
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: false
 *         description: ID do user da consulta
 *     responses:
 *       200:
 *         description: Informações do endereço do CEP
 *       404:
 *         description: CEP não encontrado
 */
router.get('/cep/:cep', getCepInfo);

/**
 * @swagger
 * /history/{userId}:
 *   get:
 *     summary: Retorna o historico de consultas de CEP de um user
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do user
 *     responses:
 *       200:
 *         description: Lista de CEPs consultados pelos user
 *       404:
 *         description: user não encontrado
 */
router.get('/history/:userId', getHistory);

/**
 * @swagger
 * /delete/{cep}:
 *   delete:
 *     summary: deleta um cep do historico do user
 *     parameters:
 *       - in: path
 *         name: cep
 *         schema:
 *           type: string
 *         required: true
 *         description: O CEP a ser deletado do historico do user
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do user
 *     responses:
 *       200:
 *         description: CEP removido com sucesso
 *       404:
 *         description: CEP não encontrado no historico do user
 */
router.delete('/delete/:cep', deletCep);
router.use('/', authRoutes)

module.exports = router;