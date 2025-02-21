const rateLimit = require('express-rate-limit');
const express = require('express');
const app = express();

app.use(express.json());

const cepLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    message: 'Muitas requisições para o CEP, tente novamente em 15 minutos'
});

app.use('/cep/:cep', cepLimiter);

const routes = require('./routes');
app.use(routes);

module.exports = app; 