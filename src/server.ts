import express from 'express';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import {authenticateToken} from "./middleware/authenticateToken";
import {generateAndInsertFakeData} from "./data/baseData";
import {UserModel, userSchema} from "./models/User";

const app = express();
const port = 3000;
const secretKey = 'secretKey';

// Conectar ao banco de dados MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase');

// Verificar se a conexão foi bem-sucedida
mongoose.connection.on('connected', () => {
    console.log('Conectado ao banco de dados!');
    // Você também pode exibir algumas informações sobre o banco de dados conectado
    console.log('Informações do banco de dados:');
    console.log(`Nome do banco de dados: ${mongoose.connection.name}`);
    console.log(`Host: ${mongoose.connection.host}`);
    console.log(`Porta: ${mongoose.connection.port}`);
});

// Verificar se a conexão falhou
mongoose.connection.on('error', (error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
});

// Gera e grava os dados falsos apenas na primeira inicialização do servidor
generateAndInsertFakeData();

app.use(bodyParser.json());
app.post('/login', async (req, res) => {
    const { cpf, senha } = req.body;
    try {
        // Procurar usuário no banco de dados
        const user = await UserModel.findOne({ cpf });
        if (!user) {
            return res.status(401).json({ error: 'Usuário não encontrado' });
        }
        // Verificar a senha
        if (user.senha !== senha) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }
        // Gerar token JWT
        const token = jwt.sign({ cpf }, secretKey);
        res.json({ token });
    } catch (error) {
        console.error('Erro durante a autenticação:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.use('/users', authenticateToken);
app.get('/users', async (req, res) => {
    try {
        console.log('\nBuscando usuários...\n');
        // Buscar todos os usuários no banco de dados
        const users = await UserModel.find();
        console.log('Usuários encontrados:', users);
        // Retornar a lista de usuários
        res.json({ users });
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
