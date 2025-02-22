const bcrypt = require('bcrypt');
const User = require('../models/User');

const saltRounds = 10;

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
        }

        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(409).json({ message: 'Usuário já cadastrado.' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({ name, email, password: hashedPassword });
        return res.status(201).json({ message: 'Usuário cadastrado com sucesso.', user: newUser });
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        return res.status(500).json({ message: 'Erro interno ao cadastrar usuário.' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Usuário não encontrado.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Senha incorreta.' });
        }
        const { id, name } = user;
        return res.json({ message: 'Autenticado com sucesso.', user: {id, name} });
    } catch (error) {
        console.error('Erro ao autenticar usuário:', error);
        return res.status(500).json({ message: 'Erro interno ao autenticar usuário.' });
    }
};

module.exports = { register, login };