# Fake data

Função que cria os dados fake de usuários que podem ser usados como alguns dados do banco de dados. 
Portando criei funções para criar esses dados sensíveis, sendo CPF e senha, explicando cada funcionalidade.

---
## `` generateRandomCPF()``
Esta função gera um número de CPF aleatório.

### Funcionamento
1. Inicializa uma string vazia para armazenar o CPF.
2. Utiliza um loop para gerar 11 dígitos aleatórios e adicioná-los à string do CPF.
3. Retorna o CPF gerado.

````ts
// Função para gerar CPF aleatório
function generateRandomCPF() {
    let cpf = '';
    for (let i = 0; i < 11; i++) {
        cpf += Math.floor(Math.random() * 10).toString();
    }
    return cpf;
}
````

---
## `` generateRandomPassword(length: number)``
Esta função gera uma senha aleatória com o comprimento especificado.

### Parâmetros
- `length`: O comprimento da senha a ser gerada.

### Funcionamento
1. Inicializa uma string vazia para armazenar a senha.
2. Define um conjunto de caracteres que podem ser usados na senha.
3. Utiliza um loop para gerar caracteres aleatórios do conjunto de caracteres e adicioná-los à string da senha.
4. Retorna a senha gerada.

````ts
// Função para gerar senha aleatória
function generateRandomPassword(length: number) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
}

````

---

## ``generateAndInsertFakeData()``
Esta função gera dados falsos e os insere no banco de dados.

### Funcionamento
1. Verifica se já existem dados no banco de dados consultando a coleção de usuários.
2. Se não houver usuários existentes, gera dados falsos.
3. Itera sobre o número especificado de usuários e gera um CPF e uma senha aleatória para cada um.
4. Utiliza o modelo `UserModel` para inserir todos os dados falsos de uma vez no banco de dados.
5. Exibe uma mensagem de sucesso após a inserção dos dados falsos.
6. Trata erros caso ocorram durante o processo de inserção.

````ts
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
````

## ``generateAndInsertAdminUser()``

Esta função gera e insere um usuário com credenciais aleatórias e função de administrador no banco de dados, caso ainda não exista um usuário com essa função.

### Funcionamento

1. Verifica se já existe um usuário com função de administrador no banco de dados consultando a coleção de usuários.
2. Se não houver um usuário administrador existente, gera credenciais aleatórias para o novo usuário.
3. Utiliza o modelo `UserModel` para criar um novo usuário com as credenciais aleatórias e função de administrador.
4. Salva o novo usuário no banco de dados.
5. Exibe uma mensagem de sucesso após a inserção do usuário administrador.
6. Trata erros caso ocorram durante o processo de inserção.

````ts
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
````

---
