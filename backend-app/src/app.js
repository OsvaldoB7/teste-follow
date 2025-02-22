const rateLimit = require('express-rate-limit');
const express = require('express');
const app = express();
const cors = require('cors');
const { swaggerUi, swaggerSpec} = require('./docs/swagger');

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
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app; 