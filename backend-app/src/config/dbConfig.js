require('dotenv').config();

const defaultConfig = {
    POSTGRES_USER: process.env.POSTGRES_USER || "postgres",
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || "postgres",
    POSTGRES_DB: process.env.POSTGRES_DB || "follow"
};

module.exports = defaultConfig;