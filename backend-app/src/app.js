const rateLimit = require('express-rate-limit');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const cepLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    message: 'Muitas requisições para o CEP, mais tarde'
});

app.use('/cep/:cep', cepLimiter);

const routes = require('./routes');
app.use(routes);

module.exports = app; 