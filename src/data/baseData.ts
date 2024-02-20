import fs from 'fs';

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

// Função para gerar e gravar dados falsos
export function generateAndWriteFakeData() {
    // Gerar dados falsos
    const numberOfUsers = 10;
    const fakeData = [];

    for (let i = 0; i < numberOfUsers; i++) {
        const cpf = generateRandomCPF();
        const senha = generateRandomPassword(4);
        fakeData.push({ cpf, senha });
    }

    // Escrever os dados falsos em um arquivo JSON
    fs.writeFileSync('fakeData.json', JSON.stringify(fakeData, null, 2));

    console.log('Dados falsos gerados e gravados no arquivo fakeData.json');
}
