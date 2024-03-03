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
            fakeData.push({ cpf, senha, role: "user" });
        }

        console.log(fakeData);
        // Inserir dados falsos no banco de dados
        await UserModel.insertMany(fakeData);

        console.log('Dados falsos inseridos no banco de dados com sucesso.');
    } catch (error) {
        console.error('Erro ao inserir dados falsos no banco de dados:', error);
    }
}

// Função para gerar e inserir um usuário com credenciais aleatórias e função de administrador
export async function generateAndInsertAdminUser() {
    try {
        // Verificar se já existe um usuário administrador no banco de dados
        const adminUserExists = await UserModel.exists({role: 'admin'});

        if (adminUserExists) {
            console.log('Já existe um usuário administrador cadastrado.');
            return;
        }

        // Gerar credenciais aleatórias
        const cpf = generateRandomCPF();
        const senha = generateRandomPassword(8); // Altere o comprimento da senha conforme necessário

        // Inserir o usuário no banco de dados com função de administrador
        const newUser = new UserModel({cpf, senha, role: 'admin'});
        await newUser.save();

        console.log('Usuário administrador inserido no banco de dados com sucesso.');
    } catch (error) {
        console.error('Erro ao inserir usuário administrador no banco de dados:', error);
    }
}
