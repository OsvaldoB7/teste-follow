const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Registra um novo user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: user cadastrado com sucesso
 *       400:
 *         description: Nome, email ou senha não informados
 *       409:
 *         description: user já cadastrado
 */
router.post('/signup', register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza o login do user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: user autenticado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', login);

module.exports = router;