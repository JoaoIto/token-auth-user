import mongoose from 'mongoose';
import { UserModel } from '../models/User'; // Importe o modelo de usuário

// Função para gerar CPF aleatório
function generateRandomCPF() {
    let cpf = '';
    for (let i = 0; i < 11; i++) {
        cpf += Math.floor(Math.random() * 10).toString();
    }
    return cpf;
}

// Função para gerar senha aleatória
function generateRandomPassword(length: number) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
}

// Função para gerar e inserir dados falsos no banco de dados
export async function generateAndInsertFakeData() {
    try {
        // Verifique se já existem dados no banco de dados
        const existingUsers = await UserModel.find();
        if (existingUsers.length > 0) {
            console.log('Dados falsos já foram inseridos anteriormente. Não é necessário inserir novamente.');
            return;
        }

        // Gerar dados falsos
        const numberOfUsers = 10;
        const fakeData = [];

        for (let i = 0; i < numberOfUsers; i++) {
            const cpf = generateRandomCPF();
            const senha = generateRandomPassword(4);
            fakeData.push({ cpf, senha });
        }

        // Inserir dados falsos no banco de dados
        await UserModel.insertMany(fakeData);

        console.log('Dados falsos inseridos no banco de dados com sucesso.');
    } catch (error) {
        console.error('Erro ao inserir dados falsos no banco de dados:', error);
    }
}
